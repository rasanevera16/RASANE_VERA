import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ContentHeader } from "@/components/content-header";
import { db } from "@/server/drizzle";
import PrivacyPolicy from "@/components/privacy-policy";

export const metadata: Metadata = {
  title: "Manage Privacy Policy",
  description: "Manage your privacy policy.",
};

const ManagePrivacyPolicyPage = async () => {
  const getPrivacyPolicy = await db.query.privacyPolicy.findMany();

  return (
    <>
      <ContentHeader title="Privacy Policy" />
      <Container className="mt-14">
        <PrivacyPolicy data={getPrivacyPolicy} />
      </Container>
    </>
  );
};

export default ManagePrivacyPolicyPage;
