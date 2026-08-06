import { Locale } from "@/i18n/locales";
import { createTranslator } from "next-intl";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  pixelBasedPreset,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface VerificationOtpEmailProps {
  otp: string;
  locale: Locale;
}

const VerificationOtpEmail = async ({
  otp,
  locale,
}: VerificationOtpEmailProps) => {
  const t = createTranslator({
    messages: await import(`../../../../messages/${locale}.json`),
    namespace: "emails.email_verification",
    locale,
  });
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Html lang={locale}>
        <Head />
        <Preview>{t("preview", { otp })}</Preview>
        <Body
          lang={locale}
          className="bg-background text-foreground mx-auto p-4 text-center font-sans"
        >
          <Container className="max-w-lg">
            <Container>
              <Heading className="text-6xl leading-1.5">{t("heading")}</Heading>
              <Heading className="text-4xl leading-0 font-extrabold text-[#973c00]">
                {t("subheading")}
              </Heading>
            </Container>
            <Text className="text-lg">{t("text")}</Text>
            <Section className="rounded-full bg-[#e7e5e4] p-4">
              <Text className="text-5xl font-extralight tracking-[12px]">
                {otp}
              </Text>
            </Section>
            <Text className="text-sm text-[#4a4a4a]">{t("note")}</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

VerificationOtpEmail.PreviewProps = { otp: 123456, locale: "en" };
export default VerificationOtpEmail;
