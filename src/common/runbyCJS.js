export default function (code) {
  let module = { exports: {} }
  new Function('module', 'exports', code)(module, module.exports)
  return module
}
