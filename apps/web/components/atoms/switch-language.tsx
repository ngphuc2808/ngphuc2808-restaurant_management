"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Locale, locales } from "@/config";

const SwitchLanguage = () => {
  const t = useTranslations("SwitchLanguage");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        router.replace(pathname, {
          locale: value as Locale,
        });
        router.refresh();
      }}
    >
      <SelectTrigger className="w-[140px]" aria-label="Switch language">
        <SelectValue placeholder={t("title")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem value={locale} key={locale}>
              {t(locale)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SwitchLanguage;
