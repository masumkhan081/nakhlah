import { MdBook, MdMenuBook } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";
import { FaEarListen } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiReacthookform } from "react-icons/si";
import { ShieldQuestion, LineChart } from "lucide-react";

export const adminDashboard = {
  leftNavList: {
    main: {
      title: "Main",
      list: [
        {
          id: 1,
          title: "Dashboard",
          icon: <FiHome />,
          link: "/admin/dashboard",
          subLinks: null,
        },
        {
          id: 2,
          title: "User",
          icon: <FiHome />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "User Group",
              icon: <AiOutlineUnorderedList />,
              link: "#",
              subLinks: null,
            },
            {
              id: 2,
              title: "User List",
              icon: <AiOutlineUnorderedList />,
              link: "#",
              subLinks: null,
            },
          ],
        },
      ],
    },
    element: {
      title: "Element",
      list: [
        {
          id: 1,
          title: "Get Start",
          icon: <SiReacthookform />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "Learning Purpose",
              link: "/admin/dashboard/learner-purpose",
            },
            {
              id: 2,
              title: "Learner Level",
              link: "/admin/dashboard/learner-level",
            },
            {
              id: 3,
              title: "Learner Starting Point",
              link: "/admin/dashboard/learner-starting-points",
            },
            {
              id: 4,
              title: "Learner Goal",
              link: "/admin/dashboard/learner-goal",
            },
          ],
        },
        {
          id: 2,
          title: "Learning Journey",
          icon: <LineChart />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "Journey",
              link: "/admin/dashboard/learning-journey",
            },
            {
              id: 2,
              title: "Unit",
              link: "/admin/dashboard/learning-unit",
            },
            {
              id: 3,
              title: "Level",
              link: "/admin/dashboard/learning-level",
            },
            {
              id: 4,
              title: "Lesson",
              link: "/admin/dashboard/learning-lesson",
            },
          ],
        },
        {
          id: 3,
          title: "Questionaires",
          icon: <ShieldQuestion />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "Question",
              link: "/admin/dashboard/questions",
            },
            {
              id: 2,
              title: "Question Type",
              link: "/admin/dashboard/question-type",
            },
            {
              id: 3,
              title: "Content Type",
              link: "/admin/dashboard/content-type",
            },
            {
              id: 4,
              title: "Content Type category",
              link: "/admin/dashboard/content-type-category",
            },
            // {
            //   id: 5,
            //   title: "Content",
            //   link: "/admin/dashboard/content",
            // },
            {
              id: 6,
              title: "Question Content",
              link: "/admin/dashboard/question-content",
            },
            {
              id: 7,
              title: "Question Content Option",
              link: "/admin/dashboard/question-content-option",
            },
          ],
        },
        {
          id: 4,
          title: "Customer",
          icon: <AiOutlineUnorderedList />,
          link: "#",
          subLinks: null,
        },
      ],
    },
  },
};
