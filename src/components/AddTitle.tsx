import { Fragment, useCallback, useState, VFC } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import add from "public/add.png";
import { Button, IconPlus, IconX } from "@supabase/ui";
import { client } from "src/libs/supabase";

type Props = {
  uuid: string;
  getTitleList: VoidFunction;
};

export const AddTitle: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => {
    setTitle("");
    setAuthor("");
    setIsOpen(false);
  }, []);

  const handleAdd = useCallback(
    async (uuid: string) => {
      if (title == "") {
        alert("Input title.");
        return;
      }

      const { data, error } = await client
        .from("manga_title")
        .insert([{ user_id: uuid, title: title, author: author }]);

      if (error) {
        alert(error);
      } else {
        if (data) {
          props.getTitleList();
          closeModal();
        }
      }
    },
    [title, author, props, closeModal]
  );

  return (
    <div>
      <div className="p-2 border cursor-pointer" onClick={openModal}>
        <div className="flex justify-center">
          <Image src={add} alt="thumbnail" width={126} height={200} />
        </div>
        <div className="mt-2 text-center">ADD NEW</div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-10 overflow-y-auto"
          as="div"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center border-2">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
                <Dialog.Title
                  className="text-2xl font-medium leading-6 text-center text-gray-900"
                  as="h3"
                >
                  Add Title
                </Dialog.Title>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Title</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    value={title}
                    //setTitleの前にreturnを入れる？
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="col-span-1 text-xl text-center">Author</div>
                  <input
                    className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                    value={author}
                    //setTitleの前にreturnを入れる？
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-32 p-2">
                    <Button
                      block
                      type="default"
                      size="large"
                      icon={<IconX />}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div>
                    <Button
                      block
                      type="default"
                      size="large"
                      icon={<IconPlus />}
                      onClick={() => handleAdd(props.uuid)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
