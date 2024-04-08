import dotenv from "dotenv";
dotenv.config();

import pool from "../config/db.js";

//get user data
export async function getAllUser(req, res, next) {
  try {
    const [data] = await pool.query("SELECT * FROM videoanalytics.users");
    return data;
  } catch (error) {
    console.log(error);
  }
}
//get face detection data
export async function getFaceDetection() {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.confidence, videoanalytics.face_detections.face_image, videoanalytics.face_detections.frame_image, videoanalytics.face_detections.age, videoanalytics.face_detections.gender, videoanalytics.face_detections.mask, videoanalytics.face_detections.created_at, videoanalytics.streams.name as camera, videoanalytics.face_lists.name AS list_face
      FROM videoanalytics.face_detections INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id INNER JOIN videoanalytics.streams ON videoanalytics.face_detections.stream_id = videoanalytics.streams.id INNER JOIN videoanalytics.face_lists ON videoanalytics.face_detections.list_id = videoanalytics.face_lists.id`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// get off list data
export async function getOffListFace() {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_detections.id, videoanalytics.face_detections.face_image, videoanalytics.streams.name AS camera,  videoanalytics.face_detections.age, videoanalytics.face_detections.gender, videoanalytics.face_detections.mask, videoanalytics.face_detections.created_at 
      FROM videoanalytics.face_detections INNER JOIN videoanalytics.streams 
      WHERE videoanalytics.face_detections.stream_id =videoanalytics.streams.id and videoanalytics.face_detections.list_item_id is null`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//get all age user of off-list by month
export async function getOffListAge(date) {
  try {
    const [data] =
      await pool.query(`SELECT count(videoanalytics.face_detections.age) AS quantity, videoanalytics.face_detections.age 
      FROM videoanalytics.face_detections WHERE date(videoanalytics.face_detections.created_at) = "${date}" AND videoanalytics.face_detections.list_item_id IS  null 
      GROUP BY videoanalytics.face_detections.age ORDER BY videoanalytics.face_detections.age;
    `);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//get user gender of off-list by month
export async function getOffListGender(date) {
  try {
    const [data] =
      await pool.query(`SELECT count(videoanalytics.face_detections.gender) as quantity, videoanalytics.face_detections.gender 
    FROM videoanalytics.face_detections WHERE videoanalytics.face_detections.list_item_id is null and date(videoanalytics.face_detections.created_at) = "${date}"
    GROUP BY videoanalytics.face_detections.gender;`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// caculating timekeeping
// export async function getTimekeepingAllList() {
//   try {
//     const [data] =
//       await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.confidence, videoanalytics.face_detections.face_image, videoanalytics.face_detections.frame_image, videoanalytics.face_detections.age, videoanalytics.face_detections.gender, videoanalytics.face_detections.mask, videoanalytics.face_detections.created_at
//     FROM videoanalytics.face_detections
//     INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
//     WHERE date(videoanalytics.face_detections.created_at) = '2024-03-18' ORDER BY id;`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//get all list by date
export async function getAllListByDate(date) {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.face_image,videoanalytics.face_detections.gender, videoanalytics.face_detections.created_at
    FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
    WHERE date(videoanalytics.face_detections.created_at) = '${date}'  ORDER BY id;`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//caculate timekeeping
export async function caculateTimekeeping(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT DATE_FORMAT( videoanalytics.face_detections.created_at, "%H:%i") AS time
    FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
    WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_detections.list_item_id = ${id};`);
    let timekeeping = [];
    let result = 0;
    if (data) {
      const time = data?.map((t) => t.time);

      if (time) {
        for (let i = 0; i < time?.length; i++) {
          timekeeping.push(time[i].split(":"));
          result =
            Number(timekeeping[timekeeping.length - 1][0]) * (60000 * 60) +
            Number(timekeeping[timekeeping.length - 1][1]) * 60000 -
            (Number(timekeeping[0][0]) * (60000 * 60) +
              Number(timekeeping[0][1]) * 60000);
        }
      }
    }
    let totaltime = ((result * 1.667e-5) / 60).toFixed(1);
    return totaltime;
  } catch (error) {
    console.log(error);
  }
}
// caculate over time
export async function caculateOT(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT DATE_FORMAT( videoanalytics.face_detections.created_at, "%H:%i") AS time
    FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
    WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_detections.list_item_id = ${id};`);
    let timekeeping = [];
    let result = 0;
    if (data) {
      const time = data?.map((t) => t.time);

      if (time) {
        for (let i = 0; i < time?.length; i++) {
          timekeeping.push(time[i].split(":"));
          result =
            Number(timekeeping[timekeeping.length - 1][0]) * (60000 * 60) +
            Number(timekeeping[timekeeping.length - 1][1]) * 60000 -
            (17 * (60000 * 60) + 15 * 60000);
        }
      }
    }
    let ot = ((result * 1.667e-5) / 60).toFixed(1);
    return ot;
  } catch (error) {
    console.log(error);
  }
}
// get all list check in check out
export async function getTimeCheck(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT DATE_FORMAT( videoanalytics.face_detections.created_at, "%H:%i") AS time
  FROM videoanalytics.face_detections 
  INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
  WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_detections.list_item_id = ${id};`);
    let timeCheck = new Array(2);
    if (data?.length > 0) {
      const time = data?.map((t) => t.time);
      if (time?.length > 1) {
        for (let i = 0; i < time?.length; i++) {
          timeCheck[0] = time[0];
          timeCheck[1] = time[time.length - 1];
        }
      } else if (time?.length === 1) {
        timeCheck[0] = time[0];
        timeCheck[1] = "00:00";
      }
    }
    return timeCheck;
  } catch (error) {
    console.log(error);
  }
}
//get camera in and out
export async function getCamera(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_detections.stream_id 
FROM videoanalytics.face_detections 
INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_detections.list_item_id = ${id};`);
    let camera = new Array(2);
    if (data?.length >= 1) {
      const stream = data?.map((i) => i.stream_id);
      if (stream?.length >= 1) {
        for (let i = 0; i < stream.length; i++) {
          camera[0] = stream[0];
          camera[1] = stream[stream.length - 1];
        }
      }
    }
    return camera;
  } catch (error) {
    console.log(error);
  }
}

//get all list check in check out detail
export async function getTimekeepingDetail(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_detections.list_id , videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.gender,videoanalytics.face_detections.stream_id, videoanalytics.face_detections.va_id ,DATE_FORMAT(videoanalytics.face_detections.created_at, '%H:%i')as time
    FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.face_list_items ON videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id 
    WHERE videoanalytics.face_detections.list_item_id = ${id} AND date(videoanalytics.face_detections.created_at) = '${date}';`);
    const checkIn = "check_in";
    const checkOut = "check_out";

    if (data?.length > 0) {
      const time = data?.map((t) => t.time);
      if (time?.length > 1) {
        for (let i = 0; i < time?.length; i++) {
          data[0][checkIn] = time[0];
          data[0][checkOut] = time[time.length - 1];
        }
      } else if (time?.length === 1) {
        data[0][checkIn] = time[0];
        data[0][checkOut] = "00:00";
      }
    }
    const { time, ...result } = data[0];
    return result;
  } catch (error) {
    console.log(error);
  }
}
// get all list item
export async function getAllListAttendance() {
  try {
    const [data] = await pool.query(
      `SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name FROM videoanalytics.face_list_items;`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
// search list item by name
export async function getAllListByName(name) {
  try {
    const [data] = await pool.query(
      `SELECT videoanalytics.face_list_items.name FROM videoanalytics.face_list_items WHERE videoanalytics.face_list_items.name LIKE '%${name}%';`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
