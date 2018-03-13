let _toString = Object.prototype.toString
export const toString = function (...args) {
  return _toString.call(...args)
}

let _forEach = Array.prototype.forEach
export const forEach = function (...args) {
  return _forEach.call(...args)
}

export const offset = function (el) {
  let obj = el

  let res = {
    left: obj.offsetLeft,
    top: obj.offsetTop,
    width: obj.offsetWidth,
    height: obj.offsetHeight
  }

  while ((obj = obj.offsetParent)) {
    res.left += obj.offsetLeft
    res.top += obj.offsetTop
  }

  return res
}

export const base64ToBlob = (base64) => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0, len = byteString.length; i < len; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }

  let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  let blobUrl
  if (Builder) {
    const builder = new Builder()
    builder.append(ab)
    blobUrl = builder.getBlob(mimeString)
  } else {
    blobUrl = new window.Blob([ab], { type: mimeString })
  }

  const fd = new FormData()
  fd.append('file', blobUrl)

  return fd
}
let encodeData = function (data) {
  if (!window.btoa) { throw 'btoa undefined' }
  var str = ''
  if (typeof data === 'string') {
    str = data
  } else {
    for (var i = 0; i < data.length; i++) {
      str += String.fromCharCode(data[i])
    }
  }

  return btoa(str)
}
export function makeURI (strData, type) {
  return 'data:' + type + ';base64,' + strData
}
export function getImageData (canvas) {
  var w = canvas.width,
    h = canvas.height
  return canvas.getContext('2d').getImageData(0, 0, w, h)
}
export function genBitmapImage (oData) {
  var biWidth = oData.width
  var biHeight = oData.height
  var biSizeImage = biWidth * biHeight * 3
  var bfSize = biSizeImage + 54 // total header size = 54 bytes

  //
  //  typedef struct tagBITMAPFILEHEADER {
  //  	WORD bfType;
  //  	DWORD bfSize;
  //  	WORD bfReserved1;
  //  	WORD bfReserved2;
  //  	DWORD bfOffBits;
  //  } BITMAPFILEHEADER;
  //
  var BITMAPFILEHEADER = [
    // WORD bfType -- The file type signature; must be "BM"
    0x42, 0x4D,
    // DWORD bfSize -- The size, in bytes, of the bitmap file
    bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
    // WORD bfReserved1 -- Reserved; must be zero
    0, 0,
    // WORD bfReserved2 -- Reserved; must be zero
    0, 0,
    // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
    54, 0, 0, 0
  ]

  //
  //  typedef struct tagBITMAPINFOHEADER {
  //  	DWORD biSize;
  //  	LONG  biWidth;
  //  	LONG  biHeight;
  //  	WORD  biPlanes;
  //  	WORD  biBitCount;
  //  	DWORD biCompression;
  //  	DWORD biSizeImage;
  //  	LONG  biXPelsPerMeter;
  //  	LONG  biYPelsPerMeter;
  //  	DWORD biClrUsed;
  //  	DWORD biClrImportant;
  //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
  //
  var BITMAPINFOHEADER = [
    // DWORD biSize -- The number of bytes required by the structure
    40, 0, 0, 0,
    // LONG biWidth -- The width of the bitmap, in pixels
    biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
    // LONG biHeight -- The height of the bitmap, in pixels
    biHeight & 0xff, biHeight >> 8 & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
    // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
    1, 0,
    // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
    // has a maximum of 2^24 colors (16777216, Truecolor)
    24, 0,
    // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
    0, 0, 0, 0,
    // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
    biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
    // LONG biXPelsPerMeter, unused
    0, 0, 0, 0,
    // LONG biYPelsPerMeter, unused
    0, 0, 0, 0,
    // DWORD biClrUsed, the number of color indexes of palette, unused
    0, 0, 0, 0,
    // DWORD biClrImportant, unused
    0, 0, 0, 0
  ]

  var iPadding = (4 - ((biWidth * 3) % 4)) % 4

  var aImgData = oData.data

  var strPixelData = ''
  var biWidth4 = biWidth << 2
  var y = biHeight
  var fromCharCode = String.fromCharCode

  do {
    var iOffsetY = biWidth4 * (y - 1)
    var strPixelRow = ''
    for (var x = 0; x < biWidth; x++) {
      var iOffsetX = x << 2
      strPixelRow += fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) +
        fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) +
        fromCharCode(aImgData[iOffsetY + iOffsetX])
    }

    for (var c = 0; c < iPadding; c++) {
      strPixelRow += String.fromCharCode(0)
    }

    strPixelData += strPixelRow
  } while (--y)

  var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData)

  return strEncoded
};

export function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time)
  })
}
