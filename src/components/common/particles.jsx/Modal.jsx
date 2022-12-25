import React from 'react';

export default function Modal({ showModal, setShowModal, image, onClick, name }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <img src={image} alt="" className="w-[500px]" />
                </div>
                {/*footer*/}

                <p className="text-center font-medium text-[30px] mb-3">
                  Apakah anda yakin ingin <br /> {name} produk ini?
                </p>

                <div className="flex items-center justify-center p-6 gap-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-[70px] py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="bg-orange-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-[45px] py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClick()}
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
