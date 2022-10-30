import axios from "axios";

const URL = "https://af93-122-161-87-5.in.ngrok.io";

export const fetchAllPendingPosts = async () => {
  try {
    const response = await axios.get(`${URL}/restaurant`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchAllPendingPostsByCity = async (city) => {
  try {
    const response = await axios.get(`${URL}/restaurant?city=${city}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchAllPendingPostsByRestaurant = async (id) => {
  try {
    const response = await axios.get(`${URL}/restaurant/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateContentSatusById = async (id, status, comment) => {
  try {
    const response = await axios.patch(`${URL}/content/${id}`, {
      status: status,
      comment: comment,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const restaurantOnboarding = async (values) => {
  //   let config = {
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //   };
  try {
    const response = await axios.post(
      `${URL}/restaurant`,
      {
        ...values,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

// export const restaurantOnboarding = async () => {
//   const response = await fetch("https://reqbin.com/echo/post/json", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: `{
//    "Id": 78912,
//    "Customer": "Jason Sweet",
//    "Quantity": 1,
//    "Price": 18.00
//   }`,
//   });

//   response.json().then((data) => {
//     console.log(data);
//   });
// };

// const myApi = axios.create({
//     baseURL: "https://a24f-122-161-87-5.in.ngrok.io",
//     timeout: 10000,
//     withCredentials: true,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   });

// export const restaurantOnboarding = () => {
//   const requestOptions = {
//     mode: "no-cors",
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       restaurantName: "Idli walaaa",
//       defaultDiscount: 10,
//       city: "bangalore",
//       description: "this restaurant is fine dine restaurant",
//     }),
//   };
//   fetch(`${URL}/restaurant`, requestOptions)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };
