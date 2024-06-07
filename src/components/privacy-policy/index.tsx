"use client";

import { useEditPrivacyPolicy } from "@/features/privacy-policy/use-edit-privacy-policy";
import { InsertPrivacyPolicyValues } from "@/server/drizzle/schema";
import { TPrivacyPolicy } from "@/types/privacy-policy-type";
import { PrivacyPolicyForm } from "./privacy-policy-form";

interface PrivacyPolicyProps {
  data: TPrivacyPolicy[];
}

const PrivacyPolicy = ({ data }: PrivacyPolicyProps) => {
  const { statusEditPrivacyPolicy, executeEditPrivacyPolicy } =
    useEditPrivacyPolicy();

  const onSubmit = (values: InsertPrivacyPolicyValues) => {
    executeEditPrivacyPolicy({
      ...values,
      id: data[0].id,
    });
  };

  return (
    <>
      {data.map((privacyPolicy) => (
        <PrivacyPolicyForm
          key={privacyPolicy.id}
          onSubmit={onSubmit}
          initialData={privacyPolicy.description}
          loading={statusEditPrivacyPolicy === "executing"}
        />
      ))}
    </>
  );
};

export default PrivacyPolicy;
