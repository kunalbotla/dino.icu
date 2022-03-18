import { useRouter } from 'next/router'

// export default function BlankPageForTesting() {
//   return (
//     <div>YOLO nothing here!</div>
//   )
// }

export default function RedirectPage() {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push('https://meta.dino.icu');
    return;
  }
}

RedirectPage.getInitialProps = ctx => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: 'https://meta.dino.icu' });
    ctx.res.end();
  }
  return { };
}