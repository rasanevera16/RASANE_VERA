import { Metadata } from "next";

import About from "@/components/about";
import { db } from "@/server/drizzle";
import { Container } from "@/components/ui/container";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Manage About",
  description: "Manage your information about your company.",
};

const ManageAboutPage = async () => {
  const getAbout = await db.query.about.findMany({
    with: {
      aboutAchievements: true,
    },
  });

  return (
    <>
      <Header
        title="Tentang Rasane Vera"
        showAddButton={getAbout.length === 0}
      />
      <Container className="mt-14">
        <About data={getAbout} />
      </Container>
    </>
  );
};

export default ManageAboutPage;
