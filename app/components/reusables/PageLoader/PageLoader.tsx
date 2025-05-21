import { Suspense } from "react";
import Spinner from "../Spinner/Spinner";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
