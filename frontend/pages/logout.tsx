import Link from "next/link";

const LogOut = () => {
  return (
    <div className="ml-20">
      <h2 className="mt-10 mb-5">
        You have been logged out !
      </h2>
      <div className="primary-color">
        <Link href="/login">
          Log in again
        </Link>
      </div>
    </div>
  )
}

export default LogOut;
