import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ContentHeader } from "@/components/content-header";
import { db } from "@/server/drizzle";
import TermsOfService from "@/components/terms-of-service";

export const metadata: Metadata = {
  title: "Manage Terms of Service",
  description: "Manage your terms of service.",
};

const ManageTermsOfServicePage = async () => {
  const getTermsOfService = await db.query.termsOfService.findMany();

  return (
    <>
      <ContentHeader title="Terms of Service" />
      <Container className="mt-14">
        <TermsOfService data={getTermsOfService} />
      </Container>
    </>
  );
};

export default ManageTermsOfServicePage;
