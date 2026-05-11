import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  const citationDoiUrl = t("about_page.citation_doi_url");

  return (
    <section className="container mx-auto px-4 py-16 text-foreground">
      <h1 className="text-[50px] xl:text-[50px] font-bold leading-[38px] xl:leading-[54px] mb-12">
        {t("about_page.title")}
      </h1>

      <div className="mx-auto space-y-6">
        <p className="text-lg leading-relaxed">{t("about_page.description")}</p>
      </div>

      <h2 className="mt-12 text-[34px] xl:text-[30px] font-semibold leading-[38px] xl:leading-[54px] mb-12">
        {t("about_page.citation_title")}
      </h2>

      <p className="text-lg leading-relaxed">
        {t("about_page.citation")}{" "}
        <a
          href={citationDoiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4"
        >
          {t("about_page.citation_doi_label")}
        </a>
      </p>
    </section>
  );
}
