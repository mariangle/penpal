import ProfilePicture from "./ProfilePicture";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IUser } from "../types/User";
import Link from "next/link";
import { getUsers } from "../actions/getUsers";

const SearchInput = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFilter = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value !== "");
  };

  const handleClickUser = () => {
    setShowDropdown(false);
    setSearchQuery("");
  };

  const filteredUsers = users.filter(({ name }) =>
    [name].some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative">
      <div className="flex gap-2 items-center justify-between relative">
        <HiSearch className="absolute left-2"/>
        <input
          type="text"
          id="search"
          placeholder="Search for users"
          className="search_input w-full"
          value={searchQuery}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      {showDropdown && (
        <div className="dropdown p-1" ref={dropdownRef}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                key={user.id}
                className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                href={`/users/${user?.id}`}
                onClick={handleClickUser}
              >
                <div className="w-8 h-8">
                  <ProfilePicture user={user} />
                </div>
                <div className="text-sm font-semibold">{user.name}</div>
              </Link>
            ))
          ) : (
            <div className="text-xs p-2">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
