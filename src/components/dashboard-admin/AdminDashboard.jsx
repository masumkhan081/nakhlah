"use client";
import { useNavbarState } from "@/store/useAdminStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import Image from "next/image";

import img1 from "../../../public/q.png";
import img2 from "../../../public/q.jpg";
import img3 from "../../../public/q.svg";

import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const isOpenCall = useNavbarState((state) => state.isOpen);
  const lists = [
    {
      id: 1,
      title: "New Customers",
      subTitle: "From last week",
      num: "132",
    },
    {
      id: 2,
      title: "Orders",
      subTitle: "Orders in waitlist",
      num: "287",
    },
    {
      id: 3,
      title: "Monthly Profit",
      subTitle: "For last 30 days",
      num: "7.4K",
    },
    {
      id: 4,
      title: "Orders",
      subTitle: "Orders in waitlist",
      num: "75",
    },
  ];
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 `}
    >
      {lists.map((item) => (
        <Card
          key={item.id}
          className=" textPrimaryColor bg-white border-none rounded-xl"
        >
          <CardHeader>
            <CardTitle className="textSemiHeader font-bold">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between py-1 items-center">
              <p className="textSmall textSecondaryColor">{item.subTitle}</p>
              <h1 className="textHeader font-bold">{item.num}</h1>
            </div>

            <Progress
              // You can set the theme to the desired color
              style={{ backgroundColor: "var(--uDBg)" }}
              indentorColor={`bg-[--uDHoverText]`} // Change the background color here
              value="50" // Set the progress value
            />
          </CardContent>
        </Card>
      ))}

      {/* <div className="flex gap-2 bg-slate-500">
        <Image src={img1} width={50} height={50} alt="Picture of the author" />
        <Image src={img2} width={50} height={50} alt="Picture of the author" />
        <Image className="bg-white" src={img3} width={50} height={50} alt="Picture of the author" />
      </div> */}
    </div>
  );
};

export default AdminDashboardPage;
