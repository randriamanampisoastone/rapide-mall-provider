import langue from "@/data/language/app/mart/AddMartProduct.json";
import { createFileRoute } from "@tanstack/react-router";
import useTranslate from "@/hooks/useTranslate";
import MartItemsList from "@/components/app/mart/addProduct/MartItemsList";
import { Input } from "@/components/ui/input";
import { Save, ShoppingBasket, X } from "lucide-react";
import AddItems from "@/components/app/mart/addProduct/AddItems";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  resetMartProduct,
  setProductDescription,
  setProductName,
  upsertSizeAndWeight,
} from "@/redux/slices/mart.product.slice";
import AddProductDescription from "@/components/app/mart/addProduct/AddProductDescription";
import { Button } from "@/components/ui/button";
import InputNumber from "@/components/customComponents/InputNumber";
import { useCreateMartProduct } from "@/api/mart/create.mart.product.api";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { errorSound } from "@/utils/audio.player.util";

export const Route = createFileRoute("/app/mart/add-product")({
  component: RouteComponent,
});

function RouteComponent() {
  const translate = useTranslate(langue);
  const martProduct = useSelector((state: RootState) => state.martProduct);
  const dispatch = useDispatch();
  const [confirmMode, setConfirmMode] = useState<boolean>(false);
  const locale = useSelector((state: RootState) => state.language.locale);

  const {
    mutate: mutateCreateMartProduct,
    isPending: isPendingCreateMartProduct,
    isSuccess: isSuccessCreateMartProduct,
  } = useCreateMartProduct();

  const handleCreateMartProduct = (providerPassword: string) => {
    const mainProduct = martProduct.martItems.find((item) => item.isMain);
    if (!mainProduct) {
      toast.error(translate("main_item_missing_please_select_one"));
      errorSound.play();
      return;
    }

    mutateCreateMartProduct({
      name: martProduct.name,
      description: martProduct.description,
      width: martProduct.width,
      height: martProduct.height,
      length: martProduct.length,
      weight: martProduct.weight,
      martItems: martProduct.martItems,
      providerPassword,
      locale,
    });
  };

  useEffect(() => {
    if (isSuccessCreateMartProduct) {
      toast.success(translate("product_created_successfully"));
      setConfirmMode(false);
      dispatch(resetMartProduct());
    }
  }, [isSuccessCreateMartProduct]);

  useEffect(() => {
    dispatch(resetMartProduct());
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-[var(--background-secondary)] space-y-3 p-5 rounded-md">
        <div className="flex">
          <div className="flex items-center justify-center rounded-l-md border border-r-0 px-2 bg-[var(--background-secondary)]">
            <ShoppingBasket />
          </div>
          <Input
            placeholder={translate("name") + "..."}
            className="max-w-100 rounded-l-none border-l-0"
            value={martProduct.name}
            onChange={(e) => dispatch(setProductName(e.target.value))}
          />
        </div>
        <AddProductDescription
          descriptions={martProduct.description}
          setDescriptions={(data) => {
            dispatch(setProductDescription(data));
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <InputNumber
            label={translate("width") + " ( cm )"}
            value={martProduct.width}
            setValue={(data) =>
              dispatch(
                upsertSizeAndWeight({
                  width: data || 0,
                  height: martProduct.height,
                  length: martProduct.length,
                  weight: martProduct.weight,
                }),
              )
            }
          />
          <InputNumber
            label={translate("height") + " ( cm )"}
            value={martProduct.height}
            setValue={(data) =>
              dispatch(
                upsertSizeAndWeight({
                  width: martProduct.width,
                  height: data || 0,
                  length: martProduct.length,
                  weight: martProduct.weight,
                }),
              )
            }
          />
          <InputNumber
            label={translate("length") + " ( cm )"}
            value={martProduct.length}
            setValue={(data) =>
              dispatch(
                upsertSizeAndWeight({
                  width: martProduct.width,
                  height: martProduct.height,
                  length: data || 0,
                  weight: martProduct.weight,
                }),
              )
            }
          />
          <InputNumber
            label={translate("weight") + " ( g )"}
            value={martProduct.weight}
            setValue={(data) =>
              dispatch(
                upsertSizeAndWeight({
                  width: martProduct.width,
                  height: martProduct.height,
                  length: martProduct.length,
                  weight: data || 0,
                }),
              )
            }
          />
        </div>
      </div>
      <MartItemsList />

      <AddItems />

      <div className="flex justify-end">
        <Button
          className="font-bold bg-[var(--green-secondary)] hover:bg-[var(--green-secondary)] text-[var(--green)] cursor-pointer"
          onClick={() => setConfirmMode(true)}
        >
          <Save /> {translate("save_product")}
        </Button>
      </div>

      {confirmMode && (
        <div className="fixed top-0 left-0 z-50 bg-[#0000008f] w-screen h-screen flex items-center justify-center">
          <div>
            {isPendingCreateMartProduct && (
              <div className="absolute w-full h-full flex items-center justify-center">
                <ScaleLoader color="var(--green)" />
              </div>
            )}
            <div
              className={cn("p-8 bg-[var(--background)] rounded-md space-y-2", {
                "opacity-15": isPendingCreateMartProduct,
              })}
            >
              <div className="flex justify-end">
                <button
                  className="bg-[var(--red)] rounded cursor-pointer"
                  onClick={() => setConfirmMode(false)}
                >
                  <X className="size-4" />
                </button>
              </div>
              <div>
                <InputOTP maxLength={6} onComplete={handleCreateMartProduct}>
                  <InputOTPGroup className="m-auto">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-center text-[var(--gray)] text-xs">
                  {translate("enter_your_password")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
