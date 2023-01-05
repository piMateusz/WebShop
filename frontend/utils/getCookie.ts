// Get cookie from different source - client side: document.cookie, server side: context.req.headers.cookie

export default function getCookie(source: any, cname: string) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(source);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}