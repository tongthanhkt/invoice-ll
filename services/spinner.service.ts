import { signal } from "@preact/signals-react";

class SpinnerService {
  private static instance: SpinnerService;
  private isLoading = signal<boolean>(false);

  private constructor() {}

  public static getInstance(): SpinnerService {
    if (!SpinnerService.instance) {
      SpinnerService.instance = new SpinnerService();
    }
    return SpinnerService.instance;
  }

  public startSpinner(): void {
    this.isLoading.value = true;
  }

  public endSpinner(): void {
    this.isLoading.value = false;
  }

  public getLoadingState(): boolean {
    return this.isLoading.value;
  }

  public subscribe(callback: (isLoading: boolean) => void): () => void {
    return this.isLoading.subscribe(callback);
  }

  public executePromises<T>(prm: Promise<T>): Promise<T> {
    this.startSpinner();
    return prm.finally(() => this.endSpinner());
  }
}

export const spinnerService = SpinnerService.getInstance();
