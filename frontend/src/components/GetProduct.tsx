"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SendData from "./SendData"
import { useState } from "react"

const formSchema = z.object({
    productname: z.string().min(2, "Please enter the product name."),
    productcategory: z.string().min(1, "Category is required"),
    productprice: z.preprocess(
        (val) => parseFloat(val as string),
        z.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a number',
        }).int('Please enter a valid integer')
    ),
    productrating: z.preprocess(
        (val) => parseFloat(val as string),
        z.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a number',
        }).int('Please enter a valid integer')
    ),
})

export default function GetProduct() {

    const [tableData, setTableData] = useState([]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productRating, setProductRating] = useState("");
    const [productCategory, setProductCategory] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productname: "",
            productprice: "",
            productrating: "",
            productcategory: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        setProductName(values.productname);
        setProductPrice(values.productprice);
        setProductRating(values.productrating)
        setProductCategory(values.productcategory)

        form.reset({
            productname: "",
            productprice: "",
            productrating: "",
            productcategory: "",

        });

        SendData(values)
            .then(response => {
                if (response.status === 'success') {
                    const val = response['received_data']
                    console.log(val);
                    setTableData(val);
                }
                // console.log(tableData);

            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="p-6 text-white rounded-lg h-auto my-10 w-[700px]">
            <div className="bg-black p-6 rounded-lg h-auto my-10 w-[700px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <FormField
                                control={form.control}
                                name="productname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Samsung S23" className="text-black" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-2">
                            <FormField
                                control={form.control}
                                name="productprice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the product price"
                                                type="number"
                                                className="text-black"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-2 text-black">
                            <FormField
                                control={form.control}
                                name="productcategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Product Category</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Electronics">Electronics</SelectItem>
                                                <SelectItem value="Clothing">Clothing</SelectItem>
                                                <SelectItem value="Shoes">Shoes</SelectItem>
                                                <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-2 text-black">
                            <FormField
                                control={form.control}
                                name="productrating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Product Rating</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product rating" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form >
            </div >

            {tableData.length > 0 && (
                <div className="bg-black p-6 rounded-lg h-auto my-10 w-[700px]">
                    <div className="px-2">
                        <div className="flex p-1">
                            <div className="bg-slate-800/50 p-3 rounded-lg pr-8">
                                Product Name :
                            </div>
                            <div className="bg-slate-500/50 p-3 rounded-lg">
                                {productName}
                            </div>

                        </div>
                        <div className="flex p-1">
                            <div className="bg-slate-800/50 p-3 rounded-lg pr-8">
                                Product Price :
                            </div>
                            <div className="bg-slate-500/50 p-3 rounded-lg">
                                {productPrice}
                            </div>

                        </div>
                        <div className="flex p-1">
                            <div className="bg-slate-800/50 p-3 rounded-lg pr-8">
                                Product Rating :
                            </div>
                            <div className="bg-slate-500/50 p-3 rounded-lg">
                                {productRating}
                            </div>
                        </div>
                        <div className="flex p-1">
                            <div className="bg-slate-800/50 p-3 rounded-lg pr-8">
                                Product Category :
                            </div>
                            <div className="bg-slate-500/50 p-3 rounded-lg">
                                {productCategory}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 py-6 rounded-md w-full px-2">

                        <div className="mt-2 w-full rounded-sm ">
                            <div className="flex gap-2 px-4 my-2 ">
                                <div className="w-[15%] text-center h-full py-2 bg-slate-800/50 rounded-md">Sr No.</div>
                                <div className="w-1/2 text-center h-full py-2 bg-slate-800/50 rounded-md">City Name</div>
                                <div className="w-1/2 text-center h-full py-2 bg-slate-800/50 rounded-md">Success Probability</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {
                                    tableData.map((data, index) => (
                                        <div key={index} className="flex gap-2 px-4">
                                            <div className="w-[15%] text-center h-full py-2 bg-slate-500/50 rounded-md">{index + 1}</div>
                                            <div className="w-1/2 text-center h-full py-2 bg-slate-500/50 rounded-md">{data['cityName']}</div>
                                            <div className="w-1/2 text-center h-full py-2 bg-slate-500/50 rounded-md">{(data['successProbability'] * 100).toFixed(2) + '%'}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
}
