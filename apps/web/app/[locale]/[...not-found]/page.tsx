import { Metadata } from "next";

import Notfound from "@/app/[locale]/[...not-found]/not-found";

export const metadata: Metadata = {
  title: "404! Not found",
  description: "404! Not found",
  robots: {
    index: false,
  },
};

const NotfoundPage = () => {
  return <Notfound />;
};

export default NotfoundPage;
