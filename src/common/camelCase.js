export default function (str) {
  return str.replace(/\-([^\-])/g, function (m, m1) { return m1.toLocaleUpperCase() })
}
