import { createSelectorHook } from "react-redux";
import { RootState } from "./store";

export const useSelector = createSelectorHook<RootState>();
