import { userDashboard } from "@/components/data";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { MdStars } from "react-icons/md";
import ViewAll from "./ViewAll";
import { RiMedalFill } from "react-icons/ri";
import UserAvatar from "@/components/share/UserAvatar/UserAvatar";
import UserPoint from "../share/UserPoint/UserPoint";

const UserDashboardPage = () => {
    const { user, listOfItems } = userDashboard.home;
    const { leaderBoardList } = userDashboard
    const getBorderColor = (id) => {
        return id == leaderBoardList[user.subTitle].length ? '' : '4px solid #fff'
    }
    return (
        <div className='sm:bg-[--bgSecondary] py-5'>
            <Card className='bg-white py-10 sm:w-[90%] w-full mx-auto rounded-xl'>
                <div className="w-[93%] mx-auto">
                    {/* user main section */}
                    <Card className=' bg-[--bgSecondary]  rounded-xl'>
                        <CardContent className={`flex xl:gap-3 gap-2 py-5 2xl:px-10 xl:px-5`}>
                            <div className='w-[20%] md:w-[20%] lg:w-[12%]'>
                                <Image src={user.flag} alt='' className="object-cover" />
                            </div>
                            <div className='w-[80%] md:w-[80%] lg:w-[88%] pt-4 flex '>
                                <div className='w-full'>
                                    <h1 className='headerText font-bold'>{user.title}</h1>
                                    <p className='semiHeaderText mt-2'>{user.stage}</p>
                                    <div className='flex gap-1 items-center  mt-10'>
                                        <Progress style={{ backgroundColor: '#D3D3D3' }}
                                            indentorColor={`progressPrimary`} // Change the background color here
                                            value={user.completed} // Set the progress value
                                        />

                                        <p className='normalText pt-2'>{user.completed}%</p>
                                    </div>
                                </div>

                                <UserPoint point={user.point} />

                            </div>
                        </CardContent>
                    </Card>

                    {/* Lesson details */}
                    <div className='lg:mt-16 mt-10'>
                        <ViewAll title={'Lesson Details'} link={''} />
                        <div className="w-[90%] mx-auto mt-5 grid sm:grid-cols-2 gap-10">
                            {
                                listOfItems.map(item => (
                                    <Card key={item.id} className={`bg-[--bgSecondary] p-5 rounded-xl`}>
                                        <CardTitle className={`flex gap-2 items-center`}>
                                            <span className="text-[#00A948] semiHeaderText">{item.icon}</span>
                                            <span className="pt-1 semiHeaderText font-normal">{item.title}</span>
                                        </CardTitle>
                                        <CardContent className={`p-0 m-0`}>
                                            <div className="smallText flex justify-between pt-5">
                                                <p>Completed</p>
                                                <p>{item.completed}%</p>
                                            </div>
                                            <div className="mt-2">
                                                <Progress style={{ backgroundColor: '#D3D3D3' }}
                                                    indentorColor={`progressPrimary`} // Change the background color here
                                                    value={item.completed} // Set the progress value
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>

                    {/* LeaderBoard details */}
                    <div className="lg:mt-16 mt-10">
                        <ViewAll title={'LeaderBoard'} link={''} />
                        <div className="w-[90%] mx-auto mt-5  ">
                            {
                                leaderBoardList[user.subTitle].map(item => (
                                    <Card key={item.id} className={`border-none ${item.id == 1 ? 'rounded-b-none ' : item.id == 4 ? 'rounded-t-none' : 'rounded-none'}  bg-[--bgSecondary] p-10`} style={{ borderBottom: getBorderColor(item.id) }}>
                                        <CardContent className='p-0 flex justify-between items-center'>
                                            <div className="flex gap-3 items-center">
                                                <RiMedalFill className="text-[#00A948] headerText" />
                                                <UserAvatar />
                                                <h1 className="semiHeaderText font-bold pt-2">{item.name}</h1>
                                            </div>
                                            <div className="2xl:w-[10%] w-[15%]">
                                                <UserPoint point={item.point} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default UserDashboardPage;


