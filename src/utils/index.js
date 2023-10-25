export const  uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };

    xhr.responseType = "blob";

    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export const getImageExtension = (uri) => {
  const imgCopy = uri.slice();
  const extension = imgCopy.split("/").pop().split(".").pop();
  return extension;
};

export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day.toString().padStart(2, '0')} /${month}/${year}`;
};

export const trimAndLower = (text) => {
  return text.trim().toLowerCase();
};  

export const formatLocateDate = (date) => {
  if(!date) return null;

  if(typeof date === 'string') {
    date = Date.parse(date);
  }

  return date.toLocaleString("en-US", {day: "numeric", month: "long", year: "numeric"});
};