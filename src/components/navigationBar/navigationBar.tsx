
export const NavigationBar = () => {
    return (
        <div className="p-2">

            <ul className="flex flex-row items-center">

                <li className="mr-6">
                    <span className="text-blue-500">Ideas.by</span>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="#">Link</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="#">Link</a>
                </li>
                <li className="mr-6">
                    <img
                        className="inline object-cover w-10 h-10 mr-2 rounded-full"
                        src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                        alt="Profile image" />
                </li>
            </ul>
        </div>
    );
};