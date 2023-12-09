"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLearnerPurpose } from "../../../store/useAdminStore";

export default function AddPurpose({ rowData, title, useForEdit }) {
  //
  const { toast } = useToast();
  //
  const addEdit = useLearnerPurpose((state) => state.addEdit);
  const afterAdd = useLearnerPurpose((state) => state.afterAdd);
  const afterUpdate = useLearnerPurpose((state) => state.afterUpdate);
  //
  const [purpose, setPurpose] = useState(useForEdit ? rowData.title : "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (purpose.length < 3) {
      setError("Too Short");
    } else {
      const result = await addEdit({
        useForEdit,
        data: {
          title: purpose,
        },
        id: rowData?.id,
      });
      if (result.status == 200) {
        useForEdit ? afterUpdate(result.data) : afterAdd(result.data);
        toast({
          title: result.message,
        });
        document.getElementById("closeDialog")?.click();
      } else if (result.status == 400) {
        setError(result.errors);
      }
    }
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle className="textHeader textPrimaryColor">
          {useForEdit ? "Update" : "New"} Learner Purpose
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 text-black text-lg"
        >
          <div className="flex flex-col gap-1">
            <label>Purpose Name</label>
            <CustomInput
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              ph="New Journey Level"
            />
            <span className="text-red-700">{error}</span>
          </div>
          <CustomButton
            txt={useForEdit ? "Update" : "Add"}
            type="submit"
            style="text-blue-800"
          />
        </form>
      </DialogHeader>
    </>
  );
}
