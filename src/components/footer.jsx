import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t-2 border-gradient-to-r from-indigo-500 to-purple-600 py-1 sm:py-2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-1 sm:mb-0">
          <p className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-montserrat">
            © {new Date().getFullYear()} Pranith Konda. 
          </p>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <a
            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
            href="https://www.linkedin.com/in/konda-pranith-699916317/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
          >
            <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
              <path d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z" 
fill=""/>
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#006699] z-0 transition-all duration-500 group-hover:top-0"></div>
          </a>
          <a
            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
            href="https://github.com/Hello-world07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
          >
            <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill=""/>
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
          </a>
          <a
            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
            href="https://x.com/pranith081036"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my X profile"
          >
            <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
              <path d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z" fill="" />
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
          </a>
          <a
            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
            href="mailto:pranithkondakp@gmail.com"
            aria-label="Send me an email"
          >
            <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 42 47" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6721 17.4285C33.7387 19.6085 37.4112 20.7733 41.1737 20.7592V13.3024C40.434 13.3045 39.6963 13.2253 38.9739 13.0663V19.0068C35.203 19.0135 31.5252 17.8354 28.4599 15.6389V30.9749C28.4507 33.4914 27.7606 35.9585 26.4628 38.1146C25.165 40.2706 23.3079 42.0353 21.0885 43.2215C18.8691 44.4076 16.37 44.9711 13.8563 44.852C11.3426 44.733 8.90795 43.9359 6.81055 42.5453C8.75059 44.5082 11.2295 45.8513 13.9333 46.4044C16.6372 46.9576 19.4444 46.6959 21.9994 45.6526C24.5545 44.6093 26.7425 42.8312 28.2864 40.5436C29.8302 38.256 30.6605 35.5616 30.6721 32.8018V17.4285ZM33.3938 9.82262C31.8343 8.13232 30.8775 5.97386 30.6721 3.68324V2.71387H28.5842C28.8423 4.16989 29.4039 5.5553 30.2326 6.78004C31.0612 8.00479 32.1383 9.04144 33.3938 9.82262ZM11.645 36.642C10.9213 35.6957 10.4779 34.5653 10.365 33.3793C10.2522 32.1934 10.4746 30.9996 11.0068 29.9338C11.5391 28.8681 12.3598 27.9731 13.3757 27.3508C14.3915 26.7285 15.5616 26.4039 16.7529 26.4139C17.4106 26.4137 18.0644 26.5143 18.6916 26.7121V19.0068C17.9584 18.9097 17.2189 18.8682 16.4794 18.8826V24.8728C14.9522 24.39 13.2992 24.4998 11.8492 25.1803C10.3992 25.8608 9.25851 27.0621 8.65394 28.5454C8.04937 30.0286 8.02524 31.6851 8.58636 33.1853C9.14748 34.6855 10.2527 35.9196 11.6823 36.642H11.645Z" fill="#FFF" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4589 15.5892C31.5241 17.7857 35.2019 18.9638 38.9729 18.9571V13.0166C36.8243 12.5623 34.8726 11.4452 33.3927 9.82262C32.1372 9.04144 31.0601 8.00479 30.2315 6.78004C29.4029 5.5553 28.8412 4.16989 28.5831 2.71387H23.09V32.8018C23.0849 34.1336 22.6629 35.4304 21.8831 36.51C21.1034 37.5897 20.0051 38.3981 18.7425 38.8217C17.4798 39.2453 16.1162 39.2629 14.8431 38.872C13.57 38.4811 12.4512 37.7012 11.6439 36.642C10.3645 35.9965 9.3399 34.9387 8.7354 33.6394C8.1309 32.3401 7.98177 30.875 8.31208 29.4805C8.64239 28.0861 9.43286 26.8435 10.556 25.9535C11.6791 25.0634 13.0693 24.5776 14.5023 24.5745C15.1599 24.5766 15.8134 24.6772 16.4411 24.8728V18.8826C13.7288 18.9477 11.0946 19.8033 8.86172 21.3444C6.62887 22.8855 4.89458 25.0451 3.87175 27.5579C2.84892 30.0708 2.58205 32.8276 3.10392 35.49C3.62579 38.1524 4.91367 40.6045 6.80948 42.5453C8.90731 43.9459 11.3458 44.7512 13.8651 44.8755C16.3845 44.9997 18.8904 44.4383 21.1158 43.2509C23.3413 42.0636 25.2031 40.2948 26.5027 38.133C27.8024 35.9712 28.4913 33.4973 28.4962 30.9749L28.4589 15.5892Z" fill="" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9736 13.0161V11.4129C37.0005 11.4213 35.0655 10.8696 33.3934 9.82211C34.8695 11.4493 36.8229 12.5674 38.9736 13.0161ZM28.5838 2.71335C28.5838 2.42751 28.4968 2.12924 28.4596 1.8434V0.874023H20.8785V30.9744C20.872 32.6598 20.197 34.2738 19.0017 35.4621C17.8064 36.6504 16.1885 37.3159 14.503 37.3126C13.5106 37.3176 12.5311 37.0876 11.6446 36.6415C12.4519 37.7007 13.5707 38.4805 14.8438 38.8715C16.1169 39.2624 17.4805 39.2448 18.7432 38.8212C20.0058 38.3976 21.1041 37.5892 21.8838 36.5095C22.6636 35.4298 23.0856 34.1331 23.0907 32.8013V2.71335H28.5838ZM16.4418 18.8696V17.167C13.3222 16.7432 10.1511 17.3885 7.44529 18.9977C4.73944 20.6069 2.65839 23.0851 1.54131 26.0284C0.424223 28.9718 0.336969 32.2067 1.29377 35.206C2.25057 38.2053 4.195 40.792 6.81017 42.5448C4.92871 40.5995 3.65455 38.1484 3.14333 35.4908C2.63212 32.8333 2.906 30.0844 3.9315 27.5799C4.957 25.0755 6.68974 22.924 8.91801 21.3882C11.1463 19.8524 13.7736 18.9988 16.4791 18.9318L16.4418 18.8696Z" fill="" />
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-black to-red-600 z-0 transition-all duration-500 group-hover:top-0"></div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;