/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import helmet from 'helmet';

const app = express();
const PORT = 3000;
// before using helmet there was a X-Powered-By which was giving information about the technology of our application but after using helmet that value is removed from th response headers
app.use(helmet());
app.use(helmet.xssFilter());

// this is for passinf the referre data when we hit the third party website
// (By default the referrerPolicy is set to no referrer)
app.use(helmet.referrerPolicy({
  policy: 'origin',
})
)

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
