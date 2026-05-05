import heroDesktop from "@/assets/home/hero_desktop.png";
import heroMobile from "@/assets/home/hero_mobile.png";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE } from "@/lib/lang";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

export function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useParams();
  const locale = lang ?? DEFAULT_LOCALE;

  return (
    <section className="relative isolate h-[560px] overflow-hidden bg-[#131313] md:h-[702px]">
      <picture className="absolute inset-0 -z-20 block h-full w-full">
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <img
          loading="eager"
          fetchPriority="high"
          draggable="false"
          src={heroMobile}
          alt="BEM Banner"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      <div className="flex h-full items-center px-6 py-16 md:items-start md:px-10 md:pt-[190px]">
        <div className="max-w-[714px]">
          <h1 className="hero-reveal hero-reveal-1 max-w-[714px] font-hero text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#f8faf7] md:text-[72px] md:leading-[78px]">
            {t("home.hero.title.first_block")} <br />
            {t("home.hero.title.second_block")}
          </h1>
          <p className="hero-reveal hero-reveal-2 mt-6 max-w-[635px] text-[18px] leading-7 text-[#dde7dc] md:text-[21px] md:leading-8">
            {t("home.hero.description")}
          </p>
          <div className="hero-reveal hero-reveal-3 mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => navigate(`/${locale}/explorar`)}
              className="h-11 min-w-[172px] rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {t("home.hero.cta")}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/${locale}/distribuicao`)}
              className="h-11 min-w-[221px] rounded-md border-2 border-primary bg-transparent px-6 text-base font-semibold text-white hover:bg-primary/15 hover:text-white"
            >
              {t("home.hero.secondary_cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
