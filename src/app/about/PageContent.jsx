import JsonLd from "@/shared/config/seo/JsonLd";
import { Box, Divider, Typography } from "@mui/material";
import styles from "./PageContent.module.css";
import Image from "next/image";
import FeedbackForm from "@/shared/ui/forms/FeedbackForm";

export default function PageContent() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Codzilla School",
    url: "https://codzilla-school.com",
    logo: "/logo.svg",
    description: "Онлайн школа программирования для детей",
    sameAs: ["https://instagram.com/codzilla", "https://facebook.com/codzilla"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+7-705-209-4540",
      email: "info@codzilla-school.com",
    },
  };

  return (
    <>
      <JsonLd pageType="about" additionalData={organizationJsonLd} />
      <div className="page">
        <Box
          className={"flex gap-40 col w-100 ai-center"}
          style={{ maxWidth: 700 }}
        >
          <Typography variant="h1" component="h1">
            Свяжитесь с нами
          </Typography>
          <Typography variant="body2" align="center">
            Мы всегда рады ответить на ваши вопросы, обсудить детали обучения
            или помочь с выбором курса для вашего ребенка.
          </Typography>
        </Box>

        <Box className={styles.contentWrapper}>
          <Box className={styles.sideInfoWrapper}>
            <Box className={styles.infoItem}>
              <Image
                src="/icons/about/shop.svg"
                alt="Контакты"
                width={18}
                height={18}
              />
              <Box className={styles.infoText}>
                <h4>Наши контакты</h4>
              </Box>
            </Box>

            <Divider orientation="horizontal" variant="fullWidth" flexItem />

            <Box className={styles.infoItem}>
              <Image
                src="/icons/about/map.svg"
                alt="Карта"
                width={18}
                height={18}
              />
              <Box className={styles.infoText}>
                <h4>Адрес</h4>
                <p>
                  ​БЦ “Эдем”
                  <br />
                  ​Улица Нурсултана Назарбаева, 246Б​
                  <br />
                  305 офис; 3 этаж
                </p>
              </Box>
            </Box>

            <Divider orientation="horizontal" variant="fullWidth" flexItem />

            <Box className={styles.infoItem}>
              <Image
                src="/icons/about/time.svg"
                alt="Время работы"
                width={18}
                height={18}
              />
              <Box className={styles.infoText}>
                <h4>Время работы</h4>
                <p>
                  Пн - Пт: 09:00 - 19:00
                  <br />
                  Сб - Вс: 10:00 - 16:00
                </p>
              </Box>
            </Box>

            <Divider orientation="horizontal" variant="fullWidth" flexItem />

            <Box className={styles.infoItem}>
              <Image
                src="/icons/about/phone.svg"
                alt="Телефон"
                width={18}
                height={18}
              />
              <Box className={styles.infoText}>
                <h4>Номер телефона</h4>
                <p>
                  +7 (707) 123 45 67
                  <br />
                  +7 (707) 098 76 54
                </p>
              </Box>
            </Box>

            <Divider orientation="horizontal" variant="fullWidth" flexItem />

            <Box className={styles.infoItem}>
              <Image
                src="/icons/about/mail.svg"
                alt="Почта"
                width={18}
                height={18}
              />
              <Box className={styles.infoText}>
                <h4>Электронная почта</h4>
                <p>
                  codzilla@gmail.com
                  <br />
                  droneschool@email.ru
                </p>
              </Box>
            </Box>
          </Box>
          <Box className={styles.map}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <a
                href="https://yandex.kz/maps/ru/10298/petropavlovsk/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0px",
                }}
              >
                Петропавловск
              </a>
              <a
                href="https://yandex.kz/maps/ru/10298/petropavlovsk/house/nursultan_nazarbaev_koshesi_246b/YkAYdwNkQEMFQFtufXR4cHRlZg==/?ll=69.144963%2C54.891862&utm_medium=mapframe&utm_source=maps&z=17.3"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "14px",
                }}
              >
                Яндекс Карты — транспорт, навигация, поиск мест
              </a>
              <iframe
                src="https://yandex.kz/map-widget/v1/?ll=69.144963%2C54.891862&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyMTk5MDc0ODM5EpUB0prQsNC30LDSm9GB0YLQsNC9LCDQodC-0LvRgtKv0YHRgtGW0Log0prQsNC30LDSm9GB0YLQsNC9INC-0LHQu9GL0YHRiywg0J_QtdGC0YDQvtC_0LDQstC7LCDQndKx0YDRgdKx0LvRgtCw0L0g0J3QsNC30LDRgNCx0LDQtdCyINC606nRiNC10YHRliwgMjQ20JEiCg04SopCFUSRW0I%2C&z=17.3"
                width="100%"
                height="100%"
                frameBorder="1"
                allowFullScreen={true}
                style={{ position: "relative" }}
              ></iframe>
            </div>
          </Box>
        </Box>
      </div>

      <div className="page">
        <Box
          className={"flex gap-40 col w-100 ai-center"}
          style={{ maxWidth: 700 }}
        >
          <Typography variant="h1" component="h1">
            Остались вопросы?
          </Typography>
          <Typography variant="body2" align="center">
            Заполните форму, и наш менеджер свяжется с вами в течении <br />
            15 минут для подробной консультации.
          </Typography>
        </Box>

        <FeedbackForm />
      </div>
    </>
  );
}
