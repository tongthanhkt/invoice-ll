/* =========================
   * Navigation
   ========================= */
import BaseNavbar from "./layout/BaseNavbar";
import BaseFooter from "./layout/BaseFooter";

/* =========================
   * Invoice
   ========================= */
import InvoiceMain from "./invoice/InvoiceMain";
import InvoiceForm from "./invoice/PaymentVoucherForm";
import InvoiceActions from "./invoice/InvoiceActions";

/* =========================
   * Invoice components
   ========================= */
// * Form
// Form components
import SingleItem from "./invoice/form/SingleItem";
import Charges from "./invoice/form/Charges";

// Form / Sections

import Items from "./invoice/form/sections/Items";

// * Actions
import PdfViewer from "./invoice/actions/PdfViewer";
import LivePreview from "./invoice/actions/LivePreview";
import FinalPdf from "./invoice/actions/FinalPdf";

// * Reusable components
// Form fields
import CurrencySelector from "./reusables/form-fields/CurrencySelector";
import FormInput from "./reusables/form-fields/FormInput";
import FormTextarea from "./reusables/form-fields/FormTextarea";
import DatePickerFormField from "./reusables/form-fields/DatePickerFormField";
import FormFile from "./reusables/form-fields/FormFile";
import ChargeInput from "./reusables/form-fields/ChargeInput";
import FormCustomInput from "./reusables/form-fields/FormCustomInput";

import BaseButton from "./reusables/BaseButton";
import ThemeSwitcher from "./reusables/ThemeSwitcher";
import LanguageSelector from "./reusables/LanguageSelector";
import Subheading from "./reusables/Subheading";

/* =========================
   * Modals & Alerts
   ========================= */
import SendPdfToEmailModal from "./modals/email/SendPdfToEmailModal";

// Import/Export
import InvoiceExportModal from "./modals/invoice/InvoiceExportModal";

// Custom Selectors
import SavedInvoicesList from "./modals/invoice/components/SavedInvoicesList";

// Alerts
import NewInvoiceAlert from "./modals/alerts/NewInvoiceAlert";

/* =========================
   * Templates
   ========================= */
// Invoice templates
import DynamicInvoiceTemplate from "./templates/invoice-pdf/DynamicInvoiceTemplate";
import InvoiceLayout from "./templates/invoice-pdf/InvoiceLayout";
import InvoiceTemplate1 from "./templates/invoice-pdf/InvoiceTemplate1";
import InvoiceTemplate2 from "./templates/invoice-pdf/InvoiceTemplate2";

// Email templates
import SendPdfEmail from "./templates/email/SendPdfEmail";

export * from "./layout";

export {
  BaseNavbar,
  BaseFooter,
  InvoiceMain,
  InvoiceForm,
  InvoiceActions,
  Items,
  SingleItem,
  Charges,
  CurrencySelector,
  SavedInvoicesList,
  PdfViewer,
  LivePreview,
  FinalPdf,
  FormInput,
  FormTextarea,
  DatePickerFormField,
  FormFile,
  ChargeInput,
  FormCustomInput,
  BaseButton,
  ThemeSwitcher,
  LanguageSelector,
  Subheading,
  SendPdfToEmailModal,
  InvoiceExportModal,
  NewInvoiceAlert,
  DynamicInvoiceTemplate,
  InvoiceLayout,
  InvoiceTemplate1,
  InvoiceTemplate2,
  SendPdfEmail,
};
