import { EllipsisVerticalIcon, Loader2Icon, Trash2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { queryClient } from '../../stores/query-client';
import { useMutation } from '@tanstack/react-query';
import { httpDelete } from '../../lib/query-http';
import { listChatHistoryOptions } from '../../queries/chat-history';
import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';

type ChatHistoryActionProps = {
  chatHistoryId: string;
  onDelete?: () => void;
};

export function ChatHistoryAction(props: ChatHistoryActionProps) {
  const { chatHistoryId, onDelete } = props;

  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deleteChatHistory, isPending: isDeletingLoading } =
    useMutation(
      {
        mutationFn: (chatHistoryId: string) => {
          return httpDelete(`/v1-delete-chat/${chatHistoryId}`);
        },
        onSettled: () => {
          return queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey[0] === 'list-chat-history';
            },
          });
        },
        onSuccess: () => {
          toast.success('Chat history deleted');
          setIsOpen(false);
          onDelete?.();
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to delete chat history');
        },
      },
      queryClient,
    );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="rounded-lg p-2 opacity-0 group-hover/item:opacity-100 hover:bg-gray-100 focus:outline-none data-[state=open]:bg-gray-100 data-[state=open]:opacity-100">
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[9999]">
        {!isDeleting && (
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-500"
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleting(true);
            }}
            disabled={isDeletingLoading}
          >
            {isDeletingLoading ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2Icon className="h-4 w-4" />
                Delete
              </>
            )}
          </DropdownMenuItem>
        )}
        {isDeleting && (
          <DropdownMenuItem
            asChild
            className="focus:bg-transparent"
            onSelect={(e) => {
              e.preventDefault();
            }}
            disabled={isDeletingLoading}
          >
            <div className="flex w-full items-center justify-between gap-1.5">
              Are you sure?
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    deleteChatHistory(chatHistoryId);
                    setIsDeleting(false);
                  }}
                  className="cursor-pointer text-red-500 underline hover:text-red-800"
                  disabled={isDeletingLoading}
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="cursor-pointer text-red-500 underline hover:text-red-800"
                  disabled={isDeletingLoading}
                >
                  No
                </button>
              </div>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
