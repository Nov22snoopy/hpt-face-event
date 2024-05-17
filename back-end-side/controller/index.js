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
export async function getFaceDetection(email, listId) {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.confidence, videoanalytics.face_detections.face_image, videoanalytics.face_detections.frame_image, videoanalytics.face_detections.age, videoanalytics.face_detections.gender, videoanalytics.face_detections.mask, videoanalytics.face_detections.created_at, videoanalytics.streams.name as camera, videoanalytics.face_lists.name AS list_face
      FROM videoanalytics.face_detections 
      INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id 
      INNER JOIN videoanalytics.streams ON videoanalytics.face_detections.stream_id = videoanalytics.streams.id 
      INNER JOIN videoanalytics.face_lists ON videoanalytics.face_detections.list_id = videoanalytics.face_lists.id 
      WHERE videoanalytics.face_list_items.id > 0 ${
        email?.length > 0
          ? `AND videoanalytics.face_list_items.comment like '%${email}%'`
          : ``
      } ${
        listId?.length > 0
          ? `AND videoanalytics.face_detections.list_id in (${listId})`
          : ``
      }
      ORDER BY created_at DESC;`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// get off list data
export async function getOffListFace(date, streamId) {
  try {
    const [data] =
      await pool.query(`SELECT videoanalytics.face_detections.id, videoanalytics.face_detections.face_image, videoanalytics.streams.name AS camera,  videoanalytics.face_detections.age, videoanalytics.face_detections.gender, videoanalytics.face_detections.mask, videoanalytics.face_detections.created_at 
      FROM videoanalytics.face_detections 
      INNER JOIN videoanalytics.streams 
      ON videoanalytics.face_detections.stream_id = videoanalytics.streams.id 
      AND videoanalytics.face_detections.list_item_id is null
      WHERE videoanalytics.face_detections.id > 0 ${
        date?.length > 0
          ? `AND date(videoanalytics.face_detections.created_at) = '${date}'`
          : ``
      } ${streamId?.length > 0 ? `AND stream_id in (${streamId})` : ""}
      ORDER BY id DESC;`);
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

//get all list by date
export async function getAllListByDate(date, list_id, email) {
  //render all list item
  if (!list_id && !email) {
    try {
      const [data] =
        await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.face_image,videoanalytics.face_detections.gender, videoanalytics.face_detections.created_at, videoanalytics.face_list_items.list_id, videoanalytics.face_lists.name as list
      FROM videoanalytics.face_detections 
      INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
      INNER JOIN videoanalytics.face_lists ON videoanalytics.face_detections.list_id = videoanalytics.face_lists.id
      WHERE date(videoanalytics.face_detections.created_at) = '${date}'  ORDER BY id;`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  //render list item by list
  else if (!email && list_id) {
    try {
      const [data] =
        await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.face_image,videoanalytics.face_detections.gender, videoanalytics.face_detections.created_at, videoanalytics.face_list_items.list_id, videoanalytics.face_lists.name as list
      FROM videoanalytics.face_detections 
      INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
      INNER JOIN videoanalytics.face_lists ON videoanalytics.face_detections.list_id = videoanalytics.face_lists.id
      WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_list_items.list_id = ${list_id} ORDER BY id;`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  //render list item by email and list
  else if (list_id && email) {
    try {
      const [data] =
        await pool.query(`SELECT videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.face_image,videoanalytics.face_detections.gender, videoanalytics.face_detections.created_at, videoanalytics.face_list_items.list_id, videoanalytics.face_lists.name as list
      FROM videoanalytics.face_detections 
      INNER JOIN videoanalytics.face_list_items ON  videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id
      INNER JOIN videoanalytics.face_lists ON videoanalytics.face_detections.list_id = videoanalytics.face_lists.id
      WHERE date(videoanalytics.face_detections.created_at) = '${date}' AND videoanalytics.face_list_items.list_id = ${list_id} AND videoanalytics.face_list_items.comment LIKE "%${email}%" ORDER BY id;`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

//caculate timekeeping
export async function caculateTimekeeping(id, date) {
  try {
    const [data] =
      await pool.query(`SELECT DATE_FORMAT( videoanalytics.face_detections.created_at, "%H:%i") AS time, stream_id as camera
    FROM videoanalytics.face_detections 
    WHERE date(videoanalytics.face_detections.created_at) = '${date}'  AND videoanalytics.face_detections.list_item_id = ${id};`);
    let timekeeping = [];
    let result = 0;
    for (let i = 0; i < data?.length - 1; i++) {
      if (data[i]?.camera !== data[i + 1]?.camera) {
        timekeeping.push(data[i]?.time, data[i + 1]?.time);
      }
    }
    if (timekeeping.length > 0) {
      for (let i = 0; i < timekeeping?.length; i++) {
        result =
          Number(timekeeping[1].split(":")[0] * 60) +
          Number(timekeeping[1].split(":")[1]) -
          (Number(timekeeping[0].split(":")[0] * 60) +
            Number(timekeeping[0].split(":")[1]));
      }
    }

    console.log(result);
    return result;
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
      await pool.query(`SELECT videoanalytics.face_detections.list_id , videoanalytics.face_list_items.id, videoanalytics.face_list_items.name, videoanalytics.face_list_items.comment, videoanalytics.face_detections.gender,videoanalytics.face_detections.stream_id ,DATE_FORMAT(videoanalytics.face_detections.created_at, '%H:%i') AS time
    FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.face_list_items ON videoanalytics.face_detections.list_item_id = videoanalytics.face_list_items.id 
    WHERE videoanalytics.face_detections.list_item_id = ${id} AND date(videoanalytics.face_detections.created_at) = '${date}';`);
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.id !== data[i + 1]?.id) {
        result.push(data[i]);
      }
    }
    if (result.length > 0) {
      result.forEach((t) => {
        t.time = data?.map((t) => {
          return {
            check_in: t.stream_id === 7 || 4 ? t.time : "00:00",
            check_out: t.stream_id === 3 ? t.time : "00:00",
          };
        });
      });
      // result[0].time.forEach((t, index) => {
      //   if (
      //     time[index].check_in.split(":")[0] ===
      //       time[index].check_in.split(":")[0] &&
      //     Number(time[index].check_in.split(":")[1]) -
      //       Number(time[index].check_in.split(":")[1]) <=
      //       3
      //   ) {
      //     time.slice(index + 1, 1);
      //   }
      // });
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}

//get in list time line
export const getTimeLineDetail = async (id, date) => {
  try {
    const [data] =
      await pool.query(`SELECT face_list_items.name, comment as email ,stream_id, face_detections.created_at FROM videoanalytics.face_detections 
    INNER JOIN face_list_items ON face_detections.list_item_id = face_list_items.id
    WHERE list_item_id is not null and date(face_detections.created_at) like "%${date}%" and list_item_id = ${id};
    `);
    return data;
  } catch (error) {
    console.log(error);
  }
};

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

//get face list
export async function getListFace() {
  try {
    const [data] = await pool.query(`SELECT * FROM videoanalytics.face_lists`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// get all list by email
export async function getAllListByMail(email, list_id) {
  if (!list_id && email) {
    try {
      const [data] = await pool.query(
        `SELECT videoanalytics.face_list_items.comment AS email, videoanalytics.face_list_items.list_id, videoanalytics.face_lists.name as list FROM videoanalytics.face_list_items
        INNER JOIN videoanalytics.face_lists ON videoanalytics.face_list_items.list_id = videoanalytics.face_lists.id 
        WHERE videoanalytics.face_list_items.comment LIKE "%${email}%" ;`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  } else if (list_id && email) {
    try {
      const [data] = await pool.query(
        `SELECT videoanalytics.face_list_items.comment AS email, videoanalytics.face_list_items.list_id, videoanalytics.face_lists.name as list FROM videoanalytics.face_list_items
        INNER JOIN videoanalytics.face_lists ON videoanalytics.face_list_items.list_id = videoanalytics.face_lists.id 
        WHERE videoanalytics.face_list_items.comment LIKE "%${email}%" AND videoanalytics.face_list_items.list_id = ${list_id} ;`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

//get all notification
export const getAllNotification = async (name, streamId, timeId) => {
  try {
    if (!name && !streamId && !timeId) {
      const [data] =
        await pool.query(`SELECT * FROM videoanalytics.warning_setting;
      `);
      return data;
    } else {
      const [data] =
        await pool.query(`SELECT warning_setting.id, warning_setting.name,  warning_setting.gender, warning_setting.age, warning_setting.mask,warning_setting.stranger ,warning_setting.created_at, warning_setting.status
      FROM videoanalytics.warning_setting
      inner join warning_camera on warning_setting.id = warning_camera.notifiId
      inner join warning_time on warning_setting.id = warning_time.notifiId
      WHERE name like '%${name}%' ${
          streamId?.length > 0 ? `AND streamId in (${streamId})` : ""
        } and day_of_week like '%${timeId}%' ORDER BY id ASC
      ;`);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//get all camera detection
export const getAllCamera = async () => {
  try {
    const [data] = await pool.query(
      `SELECT videoanalytics.streams.id, videoanalytics.streams.name FROM videoanalytics.streams;`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
//get active camera
export const getActiveCamera = async () => {
  try {
    const [data] = await pool.query(
      `SELECT videoanalytics.streams.id, videoanalytics.streams.status FROM videoanalytics.streams WHERE status = 1;`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
