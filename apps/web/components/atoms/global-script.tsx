import Script from "next/script";

import { idJsonObject } from "@/shared-metadata";

const GlobalScript = () => {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(idJsonObject) }}
      />
    </>
  );
};

export default GlobalScript;
