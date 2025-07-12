import type { FC } from 'react';

const Header: FC = () => {
    return (
        <div className="sticky top-0 z-40 transform-gpu transition-[transform,opacity,backgroundColor] will-change-transform border-b-[0.5px] bg-white border-gray-200">
            <div className="relative">
                <header className="relative mx-auto my-0 max-w-none px-4 py-3 lg:px-6 lg:py-4 transition-all">
                    <div className="min-h-[44px] items-center justify-between flex">
                        {/* Logo and Navigation */}
                        <div className="absolute flex items-center gap-10 ease-[cubic-bezier(0.42,0,0.58,1)] transition-opacity opacity-100">
                            <a href="/" className="flex items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold text-gray-900 tracking-[-0.02em] leading-none">
                                        ReWear
                                    </span>
                                </div>
                            </a>
                            
                            {/* <nav className="max-lg:hidden flex items-center space-x-8">
                                <a href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors opacity-50">
                                    Home
                                </a>
                                <a href="/explore" className="text-gray-900 font-medium">
                                    Explore
                                </a>
                            </nav> */}
                        </div>

                        {/* Right Actions */}
                        <div className="ml-auto flex items-center gap-2">
                            {/* Desktop Icons */}
                            <div className="hidden items-center lg:flex lg:gap-1">
                                <button 
                                    type="button" 
                                    className="rounded-full transition relative flex items-center justify-center active:scale-[0.96] p-[10px] text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 transform-gpu"
                                    aria-label="Sign in to view saved items"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" style={{width:"24px", height:"24px"}} stroke="none">
                                        <path d="M10.7966 4.30255L11.9999 5.53674L13.2034 4.30255C15.3006 2.15177 18.6827 2.1219 20.8156 4.21294L20.905 4.30255C23.0021 6.45334 23.0313 9.92188 20.9923 12.1093L20.905 12.2009L12 21.3334L3.09505 12.2009C0.968317 10.0199 0.968317 6.48363 3.09505 4.30255C5.22178 2.12148 8.6699 2.12148 10.7966 4.30255Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                                    </svg>
                                </button>

                                <button 
                                    type="button" 
                                    className="rounded-full transition relative flex items-center justify-center active:scale-[0.96] p-[10px] text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 transform-gpu"
                                    aria-label="View Cart"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" style={{width:"24px", height:"24px"}} stroke="none">
                                        <path d="M1.0036 2.19434H4.2515L5.05542 6.5249M5.05542 6.5249L7.10589 17.3512H19.1297L20.7536 6.5249H5.05542Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M7.22081 23.5556C8.10629 23.5556 8.82411 22.8378 8.82411 21.9524C8.82411 21.0669 8.10629 20.3491 7.22081 20.3491C6.33534 20.3491 5.61752 21.0669 5.61752 21.9524C5.61752 22.8378 6.33534 23.5556 7.22081 23.5556ZM17.7765 23.5556C18.662 23.5556 19.3798 22.8378 19.3798 21.9524C19.3798 21.0669 18.662 20.3491 17.7765 20.3491C16.891 20.3491 16.1732 21.0669 16.1732 21.9524C16.1732 22.8378 16.891 23.5556 17.7765 23.5556Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Sign In Button */}
                            <div className="ml-2">
                                <button className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sm font-medium rounded-lg min-w-[72px] px-2 py-2 transition active:scale-[0.99] relative">
                                    <span>Sign in</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Search Section */}
                <div data-testid="SearchInputWrapper" className="pointer-events-none relative top-0 z-10 flex items-center justify-center lg:absolute lg:inset-x-[230px] lg:h-full xl:inset-x-[250px] ease-[cubic-bezier(0.42,0,0.58,1)] transition-opacity lg:visible">
                    <div className="pointer-events-auto w-full px-4 lg:w-[75%] lg:min-w-[380px] lg:max-w-[500px]">
                        {/* Desktop Search */}
                        <div className="hidden lg:block">
                            <div data-testid="search" className="focus-within:z-[10] focus-within:shadow-md group flex flex-row justify-center rounded-full">
                                <div className="w-full relative">
                                    <div className="flex flex-row gap-4">
                                        <div className="relative flex flex-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[16px] text-gray-700 opacity-60 lg:left-[18px]" data-testid="icon-search" style={{width:"20px", height:"20px"}} stroke="none">
                                                <path d="M20 20L16.05 16.05M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                            </svg>
                                            <input 
                                                name="search" 
                                                type="search" 
                                                role="searchbox" 
                                                autoComplete="off" 
                                                data-testid="search-input"
                                                aria-label="Search products and stores" 
                                                placeholder="" 
                                                className="h-[43px] w-full overflow-hidden rounded-full border py-3 pl-12 pr-9 text-gray-900 placeholder:text-gray-600 placeholder:opacity-60 lg:h-[52px] bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                value=""
                                            />
                                        </div>
                                    </div>
                                    <div aria-hidden="true" className="pointer-events-none absolute bottom-[4px] left-[49px] flex h-full items-center overflow-hidden lg:bottom-[0px] lg:top-[0] opacity-100">
                                        <div className="relative block h-full py-4 text-gray-500">
                                            <div className="block" id="search-placeholder" aria-live="off" role="status">
                                                <div className="h-full text-ellipsis" style={{whiteSpace: "normal", display: "flex", height: "20.7875px"}}>
                                                    <div style={{opacity: 1, transform: "translateY(0%)"}}>Yoga mats with good grip</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-testid="search-suggestions" className="top-full w-full overflow-y-auto overflow-x-hidden rounded-b-full border border-t-0 bg-white py-2 hidden absolute z-10 border-gray-200">
                                        <p className="text-sm font-medium mb-1 text-gray-600 px-4" id="search-suggestions">Suggested searches</p>
                                        <ul className="flex flex-col px-2">
                                            {["Plant-based protein powders", "Vegan leather handbags", "Bedroom decor", "Waterproof jackets", "Hoodies", "Running shoes", "Gentle cleanser", "Indoor plants"].map((suggestion, index) => (
                                                <li key={index} role="button" className="flex cursor-pointer items-center justify-between overflow-hidden rounded-lg py-1 hover:bg-gray-100 px-1" data-testid="typeahead-item">
                                                    <div className="flex w-full min-w-0 items-center gap-3 truncate">
                                                        <div className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg border border-solid border-gray-200">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700 opacity-60" data-testid="icon-search" style={{width:"16px", height:"16px"}} stroke="none">
                                                                <path d="M20 20L16.05 16.05M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="flex h-8 items-center">
                                                            <p className="text-base font-normal">{suggestion}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="pb-2 lg:hidden">
                            <div data-testid="mobile-search" className="focus-within:z-[10] focus-within:shadow-md group flex flex-row justify-center rounded-full">
                                <div className="w-full">
                                    <div className="flex flex-row gap-4">
                                        <div className="relative flex flex-1 items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[16px] text-gray-700 opacity-60 lg:left-[18px]" data-testid="icon-search" stroke="none" style={{width: "20px", height: "20px"}}>
                                                <path d="M20 20L16.05 16.05M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                            </svg>
                                            <input 
                                                name="search" 
                                                type="search" 
                                                role="searchbox" 
                                                autoComplete="off" 
                                                data-testid="search-input"
                                                aria-label="Search products and stores" 
                                                placeholder="" 
                                                className="h-[43px] w-full overflow-hidden rounded-full border-0 py-3 pl-12 pr-9 text-gray-900 placeholder:text-gray-600 placeholder:opacity-60 lg:h-[52px] border-none bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                                value=""
                                            />
                                        </div>
                                    </div>
                                    <div aria-hidden="true" className="pointer-events-none absolute bottom-[4px] flex h-full items-center overflow-hidden lg:bottom-[0px] lg:top-[0] opacity-100 left-[68px] lg:left-[65px]">
                                        <div className="relative block h-full py-4 text-gray-500">
                                            <div className="block" id="search-placeholder" aria-live="off" role="status">
                                                <div className="h-full text-ellipsis" style={{whiteSpace: "normal", display: "flex", height: "0px"}}>
                                                    <div style={{opacity: 1, transform: "translateY(0%)"}}>Eco-friendly home decor</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-testid="search-suggestions" className="w-full overflow-y-auto overflow-x-hidden rounded-b-full bg-white py-2 hidden absolute bottom-0 left-0 right-0 top-[44px] z-10 border-0 px-4 pt-6" style={{height: "100vh"}}>
                                        <h4 className="text-lg font-semibold mb-3 text-gray-900" id="search-suggestions">Suggested searches</h4>
                                        <ul className="flex flex-col">
                                            {["Plant-based protein powders", "Vegan leather handbags", "Bedroom decor", "Waterproof jackets", "Hoodies", "Running shoes", "Gentle cleanser", "Indoor plants"].map((suggestion, index) => (
                                                <li key={index} role="button" className="flex cursor-pointer items-center justify-between overflow-hidden rounded-lg py-1 hover:bg-gray-100" data-testid="typeahead-item">
                                                    <div className="flex w-full min-w-0 items-center gap-3 truncate">
                                                        <div className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg border border-solid border-gray-200">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700 opacity-60" data-testid="icon-search" stroke="none" style={{width: "16px", height: "16px"}}>
                                                                <path d="M20 20L16.05 16.05M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="flex h-8 items-center">
                                                            <p className="text-base font-normal">{suggestion}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;