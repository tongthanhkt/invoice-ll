import { spinnerService } from "@/services/spinner.service";
import { useEffect } from "react";

export function useQuerySpinner<T>(
  executor: T & {
    isLoading: boolean;
    isFetching: boolean;
  },
  useIsFetching = false
): T {
  const isFetching = useIsFetching ? executor.isFetching : executor.isFetching;

  useEffect(() => {
    if (isFetching) {
      spinnerService.startSpinner();
    } else {
      spinnerService.endSpinner();
    }
  }, [isFetching]);

  return executor;
}
