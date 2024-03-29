import Link from 'next/link'
import Image from 'next/image'

export default function Navbar ({ title }) {
  return (
    <div className="navbar bg-base-100">
      {/* <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div> */}
      <details className="flex-1 dropdown">

        <summary className="m-1 btn">更多AI功能</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <Link href="./write" legacyBehavior>
            <li><a>AI写作</a></li>
          </Link>
          <Link href="./talk" legacyBehavior>
            <li><a>AI对话</a></li>
          </Link>
        </ul>
      </details>
      <div className="flex-none gap-2">

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="/photo-1534528741775-53994a69daeb.jpg"
                width={100}
                height={100}
              />            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href="/bind" legacyBehavior>
                <a>绑定key</a>
              </Link>
            </li>


            <li>
              <Link href="/setting" legacyBehavior>
                <a>用户设置</a>
              </Link>
            </li>

            {/* <li><a>Logout</a></li> */}
          </ul>
        </div>
      </div>
    </div>)
}