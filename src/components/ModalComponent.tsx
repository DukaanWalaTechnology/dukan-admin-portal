"use client";

import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./ui/animated-modal";
import { Loader } from "lucide-react";
export function ModalComponent({ verifybutton, closebutton, title, modalcontent,handlefunctions,isLoading }:any) {


  return (
    
    <div className="flex items-center justify-center">
      
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn relative">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {verifybutton}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div className="p-4">
              <h2 className="text-lg font-bold">{title}</h2>
              <div className="mt-4">
                <p>
                {/* {JSON.stringify(modalcontent)} */}
                  <strong>Shop Name:</strong> {modalcontent?.shopName}
                </p>
                <p>
                  <strong>Address:</strong> {modalcontent?.address}
                </p>
                <p>
                  <strong>Trade Name:</strong> {modalcontent?.tradeName}
                </p>
                <p>
                  <strong>GST Number:</strong> {modalcontent?.gstNumber}
                </p>
                <p>
                  <strong>PAN Number:</strong> {modalcontent?.panNumber}
                </p>
                <p>
                  <strong>Food License:</strong> {modalcontent?.foodLicense}
                </p>
                <p>
                  <strong>Phone:</strong> {modalcontent?.phone}
                </p>
                <p>
                  <strong>Status:</strong> {modalcontent?.status}
                </p>
                <p>
                  <strong>Owner:</strong> {modalcontent?.user?.name}
                </p>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              close
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28" onClick={handlefunctions}>
             {
              isLoading? (
                <Loader className="animate-spin" size={18} />
              ) : (
                "Approve"
              )
             }
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalComponent;
