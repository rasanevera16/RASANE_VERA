import { Metadata } from "next";

import About from "@/components/about";
import { Container } from "@/components/ui/container";
import { Header } from "./_components/header";
import { getAbout } from "@/server/data/about";

export const metadata: Metadata = {
  title: "Manage About",
  description: "Manage your information about your company.",
};

const ManageAboutPage = async () => {
  const about = await getAbout();

  return (
    <>
      <Header title="Tentang Rasane Vera" showAddButton={about.length === 0} />
      <Container className="mt-14">
        <About />
      </Container>
    </>
  );
};

export default ManageAboutPage;
