import {Spinner} from "../ReactIcons/Spinner";

export function QuestionLoader() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="text-xl font-medium text-gray-500 flex items-center gap-3.5">
        <Spinner isDualRing={false} innerFill='#6b7280' className="h-5 w-5" />
        Please wait ..
      </p>
    </div>
  );
}
