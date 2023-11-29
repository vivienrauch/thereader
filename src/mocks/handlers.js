import { rest } from "msw";

const baseURL = "https://the-reader-2a70cde2ef2e.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
      return res(
          ctx.json({
              "pk": 2,
              "username": "newprofile",
              "email": "",
              "first_name": "",
              "last_name": "",
              "profile_id": 2,
              "profile_image": "https://res.cloudinary.com/dnm7rmkuf/image/upload/v1/media/../default_profile_image_nslsjn",
          })
      );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];