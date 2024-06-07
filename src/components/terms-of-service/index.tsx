"use client";

import { useEditTermsOfService } from "@/features/terms-of-service/use-edit-terms-of-service";
import { InsertTermsOfServiceValues } from "@/server/drizzle/schema";
import { TTermOfService } from "@/types/term-of-service-type";
import { TermsOfServiceForm } from "./terms-of-service-form";

interface TermsOfServiceProps {
  data: TTermOfService[];
}

const TermsOfService = ({ data }: TermsOfServiceProps) => {
  const { statusEditTermsOfService, executeEditTermsOfService } =
    useEditTermsOfService();

  const onSubmit = (values: InsertTermsOfServiceValues) => {
    executeEditTermsOfService({
      ...values,
      id: data[0].id,
    });
  };

  return (
    <>
      {data.map((term) => (
        <TermsOfServiceForm
          key={term.id}
          onSubmit={onSubmit}
          initialData={term.description}
          loading={statusEditTermsOfService === "executing"}
        />
      ))}
    </>
  );
};

export default TermsOfService;
