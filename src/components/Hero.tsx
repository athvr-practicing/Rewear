import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Main heading */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                        A place to display your <span className="block">masterpiece.</span>
                    </h1>
                </div>
                
                {/* Artwork display */}
                <div className="relative mt-12 md:mt-16 mx-auto h-72 sm:h-80 md:h-96">
                    {/* User tag - left */}
                    <div className="absolute left-1/4 -translate-x-16 md:-translate-x-24 top-6 z-50">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                            @coplin
                        </div>
                    </div>
                    
                    {/* User tag - right */}
                    <div className="absolute right-1/4 translate-x-16 md:translate-x-24 top-6 z-50">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                            @andrea
                        </div>
                    </div>
                    
                    {/* Art cards container */}
                    <div className="flex justify-center items-center w-full h-full overflow-visible">
                        {/* Card 1 - Red collage */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-red-400 rounded-2xl shadow-xl transform -rotate-12 -translate-x-52 md:-translate-x-64 z-10 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 opacity-80"></div>
                        </div>
                        
                        {/* Card 2 - Blue artwork */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-blue-300 rounded-2xl shadow-xl transform -rotate-6 -translate-x-32 md:-translate-x-40 z-20 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 opacity-80"></div>
                        </div>
                        
                        {/* Card 3 - Yellow artwork */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-yellow-300 rounded-2xl shadow-xl transform -rotate-1 -translate-x-10 md:-translate-x-14 z-30 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90"></div>
                        </div>
                        
                        {/* Card 4 - Pink artwork */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-pink-300 rounded-2xl shadow-xl transform rotate-1 translate-x-10 md:translate-x-14 z-40 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 opacity-80"></div>
                        </div>
                        
                        {/* Card 5 - Red abstract */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-red-600 rounded-2xl shadow-xl transform rotate-6 translate-x-32 md:translate-x-40 z-30 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 opacity-80"></div>
                        </div>
                        
                        {/* Card 6 - Green artwork */}
                        <div className="absolute w-40 sm:w-44 md:w-48 h-60 sm:h-64 md:h-72 bg-green-500 rounded-2xl shadow-xl transform rotate-12 translate-x-52 md:translate-x-64 z-20 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 opacity-80"></div>
                        </div>
                    </div>
                </div>
                
                {/* Description text */}
                <div className="mt-20 md:mt-24 text-center">
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                        Artists can display their masterpieces, and buyers can discover and 
                        purchase works that resonate with them.
                    </p>
                    
                    {/* CTA section */}
                    <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4">
                        <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors">
                            Join for $9.99/m
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 px-6 py-3 font-medium transition-colors">
                            Read more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;