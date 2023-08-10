import { MainNav } from "./main-nav"

const Navbar = () => {
  return (
    <div className="border-ui-border-base bg-ui-bg-base sticky top-0 z-50 w-full border-b">
      <div className="container px-6 py-3">
        <MainNav />
      </div>
    </div>
  )
}

export { Navbar }
