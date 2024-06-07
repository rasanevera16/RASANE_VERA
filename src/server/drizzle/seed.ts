import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import bycrypt from "bcryptjs";

import { about, privacyPolicy, termsOfService, users } from "./schema";

config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

const db = drizzle(sql);

const SEED_USERS = [
  {
    name: "Admin Rasane Vera",
    email: "namikulobima12@gmail.com",
    password: bycrypt.hashSync("AdminRasaneVera123*", 10),
    confirmPassword: "AdminRasaneVera123*",
    role: "admin",
    emailVerified: new Date(),
  },
  {
    name: "Mount Vera Sejati",
    email: "rasanevera16@gmail.com",
    password: bycrypt.hashSync("MountVeraSejati123*", 10),
    confirmPassword: "MountVeraSejati123*",
    role: "admin",
    emailVerified: new Date(),
  },
];

const SEED_ABOUT = {
  youtubeUrl: "https://youtu.be/XzUvUfnIKUg?si=TxrE_2Z5ExWcKll7",
  description:
    "Mount Vera Sejati adalah sebuah perusahaan yang bergerak di bidang budidaya dan pengolahan Lidah Buaya (Aloevera) menjadi produk makanan dan minuman sehat. Memiliki 2 brand usaha yaitu 'Rasane Vera' dengan produk minuman Nata de Aloevera, Aloevera Cube Drink,Aloe Liquid,Aloe Fiber,Pure Aloevera Slice dan Mr.Kriuk's, serta 'AloeLand' yang berfokus kepada kegiatan Wisata Edukasi hulu-hilir terkait Aloevera.Mount Vera Sejati didirikan pada tahun 2014,dengan luas lahan budidaya -+3500 M2, serta memiliki petani binaan sebanyak 76 orang.",
  vision:
    "1. Menjadi perusahaan minuman Aloevera yang terpercaya,handal dan terdepan dengan mengorientasikan kepuasan konsumen.",
  mission:
    "1. Terpercaya memberikan kualitas produk yang berorientasi pada standart kemananan pangan BPOM MD,ISO,GMP dan HACCP.2. Handal dengan SDM dan SDA yang berkomitmen pada mutu terbaik.3. Terdepan mengutamakan mutu kesehatan,kebersihan,kehigienisan dan kehalalan produk.4. Oke",
};

const SEED_PRIVACY_POLICY = {
  description: "Privacy Policy",
};

const SEED_TERMS_AND_CONDITIONS = {
  description: "Terms and Conditions",
};

const main = async () => {
  try {
    await db.insert(users).values(SEED_USERS).execute();
    await db.insert(privacyPolicy).values(SEED_PRIVACY_POLICY).execute();
    await db.insert(termsOfService).values(SEED_TERMS_AND_CONDITIONS).execute();
    await db.insert(about).values(SEED_ABOUT).execute();
  } catch (error: unknown) {
    console.error("Error during seed: ", error);
    process.exit(1);
  }
};

main().then(() => {
  console.log("Seed completed");
  process.exit(0);
});
