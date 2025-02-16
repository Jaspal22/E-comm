import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
    return(
    <div>
        <div className="text-2xl text-center pt-8 border-t">
            <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-16">
            <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sit, perspiciatis, molestias non, beatae veritatis error tempore est porro pariatur itaque quo provident dolorem vero? Deserunt quisquam consequuntur quia, dolor obcaecati ipsam natus aliquam illum magnam ipsum voluptatem reiciendis quam harum veniam quo tempora, rem aliquid! Explicabo animi praesentium dolorum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit nam quos provident cum! Ratione officiis soluta ex architecto dicta.</p>
                <b className="text-gray-800">Our Mission</b>
                <p>Our mission at Forever is to empower customers with choice, conveniance and Ease.</p>
            </div>
        </div>

        <div className="text-4xl py-4">
            <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance: </b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi repellat doloribus consectetur dolorum, quod exercitationem quia totam ratione illum quas non inventore sit provident.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience: </b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi repellat doloribus consectetur dolorum, quod exercitationem quia totam ratione illum quas non inventore sit provident.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Exeptional Customer Service: </b>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi repellat doloribus consectetur dolorum, quod exercitationem quia totam ratione illum quas non inventore sit provident.</p>
                </div>
        </div>
        <NewsLetterBox />
    </div>
    )
}

export default About;