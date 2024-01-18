"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  useLearnerPurpose,
  useTabularView,
} from "../../../../store/useAdminStore";
import { useState } from "react";
import CustomInput from "@/components/ui-custom/CustomInput";
import CustomButton from "@/components/ui-custom/CustomButton";
import { getHandler, getMap } from "@/lib/requestHandler";
import axios from "axios";

export default function AddPurpose({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();

  const addEdit = useLearnerPurpose((state) => state.addEdit);
  const afterAdd = useLearnerPurpose((state) => state.afterAdd);
  const afterUpdate = useLearnerPurpose((state) => state.afterUpdate);
  //
  const [purpose, setPurpose] = useState(useForEdit ? rowData.purpose : "");
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    var fileInput = document.getElementById("fileInput");
    setImage(fileInput.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    var fileInput = document.getElementById("fileInput");
    var titleInput = document.getElementById("titleInput");
    if (fileInput.files.length > 0) {
      let formData = new FormData();
      //
      var file = fileInput.files[0];
      formData.append("files.icon", file);
      formData.append("data", `{"purpose":"${titleInput.value}"}`);

      await fetch("https://api.nakhlah.xyz/api/learning-purposes", {
        method: "POST",
        body: formData,
        headers: {
          Authorization:
            "Bearer " +
            "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e",
        },
        redirect: "follow",
      })
        .then((response) => {
          alert("thren - response:  " + JSON.stringify(response));
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Upload failed.");
          }
        })
        .then((data) => {
          uploadStatus.innerHTML = "Upload complete! Server response: " + data;
        })
        .catch((error) => {
          uploadStatus.innerHTML = "Error: " + error.message;
        });
    }
  }
  const currentView = useTabularView((state) => state.data.currentView);
  const addWhat = currentView.slice(0, currentView.length - 1);
  return (
    <>
      <DialogHeader className={" py-0"}>
        <DialogTitle className="font-mono text-xl text-slate-700 py-0.25">
          {useForEdit ? "Update" : "New"} {addWhat}
        </DialogTitle>
        <div id="uploadStatus"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-2 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Learning Purpose</label>
            <CustomInput
              id="titleInput"
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              ph="Enter learning purpose"
              style="py-0.25 px-1"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <div className="flex gap-2 items-center">
            <input type="file" id="fileInput" name="file" />
            {image && (
              <img
                alt=" image"
                src={image}
                className="w-5.0 h-5.0 rounded-full border border-slate-400 bg-slate-50"
              />
            )}
          </div>

          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800 bg-blue-100 border border-slate-400 py-0.25 h-fit text-base font-semibold"
          />
        </form>
      </DialogHeader>
    </>
  );
}
