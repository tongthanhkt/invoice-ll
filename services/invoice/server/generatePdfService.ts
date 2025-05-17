import { NextRequest, NextResponse } from "next/server";
import chromium from "chrome-aws-lambda";
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";
import puppeteerCore from "puppeteer-core";
export async function generatePdfService(req: NextRequest) {
	const body: InvoiceType = await req.json();
	let browser;
	let page;

	try {
		const ReactDOMServer = (await import("react-dom/server")).default;
		const templateId = body.details.pdfTemplate;
		const InvoiceTemplate = await getInvoiceTemplate(templateId);
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));


		let launchOptions: any = {};

		if (ENV === "production") {
			const puppeteer = await import("puppeteer-core");

			// Configure Chromium for serverless environment
			const args = [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-gpu',
				'--no-first-run',
				'--no-zygote',
				'--single-process',
				'--disable-extensions',
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process',
				'--disable-site-isolation-trials'
			];

			// Get the executable path for AWS Lambda
			const executablePath = await chromium.executablePath();

			// Set up browser
			browser = await puppeteer.launch({
				args,
				executablePath,
				headless: true,
				ignoreDefaultArgs: ['--disable-extensions'],
				defaultViewport: {
					width: 1200,
					height: 800
				}
			});
		} else {
			console.log("Launching browser in development...");

			launchOptions = {
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
				headless: true,
			};
		}


		browser = await puppeteerCore.launch(launchOptions);
		if (!browser) throw new Error("Browser launch failed");

		page = await browser.newPage();
		await page.setContent(htmlTemplate, {
			waitUntil: ["networkidle0", "load", "domcontentloaded"],
			timeout: 30000,
		});

		await page.addStyleTag({ url: TAILWIND_CDN });

		const pdfBuffer = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
		});

		// Clean up browser resources
		if (page) {
			await page.close();
		}
		if (browser) {
			const pages = await browser.pages();
			await Promise.all(pages.map((p) => p.close()));
			await browser.close();
		}

		return new NextResponse(new Blob([pdfBuffer], { type: "application/pdf" }), {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=invoice.pdf",
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
		});
	} catch (error) {
		console.error("PDF Generation Error:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to generate PDF", details: error }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} finally {
		if (page) {
			try {
				await page.close();
			} catch (e) {
				console.error("Error closing page:", e);
			}
		}
		if (browser) {
			try {
				await browser.close();
			} catch (e) {
				console.error("Error closing browser:", e);
			}
		}

		console.error("PDF Generation Error:", error);
		return new NextResponse(
			JSON.stringify({
				error: "Failed to generate PDF",
				details: error instanceof Error ? error.message : String(error)
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
//