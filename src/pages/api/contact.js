import { MailOptions, transporter } from "../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  name: "Имя",
  email: "Email",
  option: "Опция",
  role: "Роль",
  topic: "Тема",
  description: "Описание",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n\n`),
    ""
  );

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `
      <div style="margin-bottom: 20px;">
        <h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3>
        <p class="form-answer" align="left">${val}</p>
      </div>
    `);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Новое сообщение от контакта</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <style type="text/css">
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333;
            text-align: center;
          }
          .form-container {
            margin-top: 20px;
            border-top: 2px solid #007BFF;
            padding-top: 20px;
          }
          .form-heading {
            color: #007BFF;
            font-size: 20px;
            margin: 10px 0;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 5px;
          }
          .form-answer {
            color: #555;
            font-size: 16px;
            margin: 0 0 24px;
            line-height: 1.5;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Новое сообщение от контакта</h2>
          <div class="form-container">${htmlData}</div>
          <div class="footer">
            <p>Спасибо, что связались с нами!</p>
            <p>Команда поддержки</p>
          </div>
        </div>
      </body>
    </html>`,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await transporter.sendMail({
        ...MailOptions,
        ...generateEmailContent(data),
        subject: data.topic,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;
