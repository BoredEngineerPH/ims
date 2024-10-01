<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\UserMeta;
use App\Http\Controllers\Controller;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $per_page = config('app.per_page');

        // Capture the page number from the POST request
        $page = $request->input('page', 1);

        // Manually set the current page for the paginator
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $users = User::paginate($request->input('per_page', $per_page));
        $_users = $users->toArray();
        $pagination = [
            'lists' => $_users['data'],
            'current_page' => $_users['current_page'],
            'from' => $_users['from'],
            'to' => $_users['last_page'],
            'per_page' => $_users['per_page'],
            'total' => $_users['total']
        ];
        return $this->sendResponse($pagination, 'Retrieve paginated users.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {

        $user = User::where('email', $request->email)->first();
        if ($user){
            return $this->sendError('User already exists.',[], 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token_name = $request->input('first_name');
        $token_name = $token_name.($request->has('middle_name') ? '-'.$request->input('middle_name') : '');
        $token_name = $token_name.($request->has('last_name') ? '-'.$request->input('last_name') : '');
        $token_name = Str::slug($token_name);
        $user->createToken($token_name);
        if(isset($input['meta']) && count($input['meta'])){
            $meta = [];
            foreach($input['meta'] as $key => $value){
                $user->meta()->save(new UserMeta([
                    'meta_key' => $key,
                    'meta_value' => $value
                ]));
            }
        }
        if($user->id > 0){
            $data = $user->toArray();
            foreach ($user->meta as $meta) {
                $data[$meta->meta_key] = $meta->meta_value;
            }
            return $this->sendResponse($data, 'User had been created.');
        }else{
            return $this->sendError('Error occured while creating the user. Please try again later.',[], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $user = User::find($id);
        if($user){
            $data = $user->toArray();
            foreach ($user->meta as $meta) {
                $data[$meta->meta_key] = $meta->meta_value;
            }
            return $this->sendResponse($data, 'User successfully fetched.');
        }else{
            return $this->sendError('User not found.',[], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(string $id): JsonResponse
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);
        if($user){
            $user->first_name = $request->input('first_name');
            $user->middle_name = $request->input('middle_name', null);
            $user->last_name = $request->input('last_name', null);
            $user->save();
            if ($user) {
                foreach ($request->input('meta', []) as $key => $value) {
                    $meta = UserMeta::updateOrCreate(
                        ['user_id' => $user->id, 'meta_key' => $key],
                        ['meta_value' => $value]
                    );
                }
                $data = User::getUserById($id);
                return $this->sendResponse($data, 'User successfully updated.');
            } else {
                return $this->sendError('Unable to complete update request.',[], 500);
            }
        }else{
            return $this->sendError('User not found.',[], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return $this->sendResponse([], 'User successfully deleted.');
        }else{
            return $this->sendError('User not found.',[], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function current(Request $request): JsonResponse
    {
        $user = Auth::user();
        $data = $user->getCurrentUser();
        return $this->sendResponse($data, 'User fetched.');
    }
}
